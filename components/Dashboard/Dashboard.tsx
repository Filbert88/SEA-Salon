import React from "react";
import ServiceForm from "./ServiceForm";
import BranchForm from "./BranchForm";
import StylistForm from "./StylistForm";

interface Stylist {
  id: number;
  name: string;
  imageUrl: string | null;
  price: string;
}

interface Branch {
  id: number;
  name: string;
  openingTime: string;
  closingTime: string;
  location: string;
  phone: string;
  description: string;
}

export interface DashboardPageProps {
  branches: Branch[];
  unassignedStylists: Stylist[];
}

const DashboardPage = ({ branches, unassignedStylists }: DashboardPageProps) => {
  return (
    <div className="pt-32 flex flex-col items-center px-10">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
        <div className="flex flex-col gap-8">
          <ServiceForm branches={branches} />
          <StylistForm branches={branches} />
          <BranchForm unassignedStylists={unassignedStylists} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
