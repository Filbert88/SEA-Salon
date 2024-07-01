import React from "react";
import BranchCard from "@/components/Branch/BranchCard";
import { db } from "@/lib/db";

export default async function BranchPage() {
  const branches = await db.branch.findMany({
    select: {
      name: true,
      location: true,
    },
  });
  return (
    <div className="px-10 sm:px-20 lg:px-40 pt-32 flex flex-col justify-center items-center mb-8">
      <div className="text-4xl text-center sm:text-7xl text-white">Our Branches</div>
      <div className="mt-6 text-xl text-white text-justify">
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
