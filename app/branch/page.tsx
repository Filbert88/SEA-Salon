import React from "react";
import BranchCard from "@/components/BranchCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export default async function BranchPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const branches = await db.branch.findMany({
    select: {
      name: true,
      location: true,
    },
  });
  return (
    <div className="px-4 sm:px-40 pt-32 flex flex-col justify-center items-center min-h-[700px] mb-8">
      <div className="text-7xl">Our Branches</div>
      <div className="mt-6 text-xl">
        Welcome to our Branch Section! At SEA-SALON, we have established various
        branches to cater to the diverse needs of our valued customers. Our
        branches are staffed with skilled professionals who are passionate about
        delivering top-notch solutions and exceeding customer expectations.
      </div>
      {branches.map((branch, index) => (
        <BranchCard
          key={index}
          branchName={branch.name}
          branchLocation={branch.location}
          href={branch.name}
        />
      ))}
    </div>
  );
}
