import React from "react";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

interface BranchCardProps {
  branchName: string;
  branchLocation: string;
  href: string;
}

export default async function BranchCard({
  branchName,
  branchLocation,
  href,
}: BranchCardProps) {
  return (
    <Link href={`/branch/${href}`} className="w-full">
      <div className="border border-white rounded-lg p-4 hover:bg-gray-500 hover:cursor-pointer w-full mt-4">
        <div className="font-bold text-2xl">
          <strong>{branchName}</strong>
        </div>
        <div>{branchLocation}</div>
      </div>
    </Link>
  );
}
