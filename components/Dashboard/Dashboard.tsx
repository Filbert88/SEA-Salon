"use client";
import React, { useState } from "react";
import ServiceForm from "./ServiceForm";
import BranchForm from "./BranchForm";
import StylistForm from "./StylistForm";
import AssignStylistForm from "./AssignStylistForm";
import ServiceEditForm from "./EditServiceForm";
import StylistEditForm from "./EditStylistForm";
import BranchEditForm from "./EditBranchForm";
import Loading from "../Loading";
import Toast from "../Toast";
import { ToastState } from "../Toast";

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

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
}

export interface DashboardPageProps {
  branches: Branch[];
  unassignedStylists: Stylist[];
  services: Service[];
  stylists: Stylist[];
}

const DashboardPage = ({
  branches,
  unassignedStylists,
  services,
  stylists,
}: DashboardPageProps) => {
  const [activeForm, setActiveForm] = useState<
    "add" | "edit" | "delete" | null
  >(null);
  const [isLoading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "info",
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-32 flex flex-col items-center px-10">
      <div className="max-w-5xl w-full shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Admin Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row sm:space-y-0 space-y-4 justify-around mb-6">
          <button
            className={`px-4 py-2 rounded ${
              activeForm === "add"
                ? "bg-custom-green text-black"
                : "border-2 border-custom-green"
            }`}
            onClick={() => setActiveForm("add")}
          >
            Add Data
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeForm === "edit"
                ? "bg-custom-green text-black"
                : "border-2 border-custom-green"
            }`}
            onClick={() => setActiveForm("edit")}
          >
            Edit Data
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeForm === "delete"
                ? "bg-custom-green text-black"
                : "border-2 border-custom-green"
            }`}
            onClick={() => setActiveForm("delete")}
          >
            Delete Data
          </button>
        </div>

        {activeForm === "add" && (
          <div className="flex flex-col gap-8">
            <ServiceForm branches={branches} setLoading={setLoading} setToast={setToast} />
            <AssignStylistForm
              branches={branches}
              unassignedStylists={unassignedStylists}
              setLoading={setLoading}
              setToast={setToast}
            />
            <StylistForm branches={branches} setLoading={setLoading} setToast={setToast} />
            <BranchForm
              unassignedStylists={unassignedStylists}
              services={services}
              setLoading={setLoading}
              setToast={setToast}
            />
          </div>
        )}

        {activeForm === "edit" && (
          <div className="flex flex-col gap-8">
            <ServiceEditForm services={services} setLoading={setLoading} setToast={setToast} />
            <StylistEditForm stylists={stylists} setLoading={setLoading} setToast={setToast} />
            <BranchEditForm branches={branches} setLoading={setLoading} setToast={setToast} />
          </div>
        )}

        {activeForm === "delete" && (
          <div>
            <p>Delete form</p>
          </div>
        )}
      </div>
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        closeToast={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
};

export default DashboardPage;
