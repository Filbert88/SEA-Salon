import React from "react";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/Dashboard/Dashboard";

export default async function DashboardWrapper() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/not-admin");
    return null;
  }

  const branchesPromise = db.branch.findMany({
    select: {
      id: true,
      name: true,
      openingTime: true,
      closingTime: true,
      location: true,
      phone: true,
      description: true,
    },
  });

  const unassignedStylistsPromise = db.stylist
    .findMany({
      where: { branchId: null },
      select: { id: true, name: true, imageUrl: true, price: true },
    })
    .then((stylists) =>
      stylists.map((stylist) => ({
        ...stylist,
        price: stylist.price.toString(), 
        imageUrl: stylist.imageUrl || null, 
      }))
    );

  const [branches, unassignedStylists] = await Promise.all([
    branchesPromise,
    unassignedStylistsPromise,
  ]);

  const branchesWithFormattedDates = branches.map((branch) => ({
    ...branch,
    openingTime: branch.openingTime.toISOString(),
    closingTime: branch.closingTime.toISOString(),
  }));

  return (
    <DashboardPage
      branches={branchesWithFormattedDates}
      unassignedStylists={unassignedStylists}
    />
  );
}
