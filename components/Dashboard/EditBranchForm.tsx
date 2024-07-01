import React, { useState } from "react";
import Toast from "../Toast";
import { ToastState } from "../Toast";
import Loading from "../Loading";

interface Branch {
  id: number;
  name: string;
  description: string;
  location: string;
  phone: string;
  openingTime: string;
  closingTime: string;
}

interface BranchesProps {
  branches: Branch[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void
}

const BranchEditForm = ({ branches, setLoading, setToast }: BranchesProps) => {
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value, 10);
    const selectedBranch = branches.find((branch) => branch.id === id);
    if (selectedBranch) {
      setSelectedBranchId(id);
      setName(selectedBranch.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBranchId) {
      setToast({
        isOpen: true,
        message: "Please select a branch first.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const data = {
        id: selectedBranchId,
        name,
        description,
        location,
        phone,
        openingTime,
        closingTime,
      };

      const response = await fetch("/api/admin/edit/branch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setToast({
          isOpen: true,
          message: "Branch updated successfully",
          type: "success",
        });
      } else {
        setToast({ isOpen: true, message: result.error, type: "error" });
        console.error("Error updating branch data:", result);
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Failed to submit form",
        type: "error",
      });
      console.error("Failed to submit form:", error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-white">Edit Branch</h2>
        <div>
          <p className="text-white">Select Branch</p>
          <select
            value={selectedBranchId ?? ""}
            onChange={handleBranchChange}
            className="p-3 w-full rounded text-black"
          >
            <option value="">Select a branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        {selectedBranchId && (
          <>
            <div className="space-y-4">
              <InputField label="Name" value={name} placeholder={name} onChange={setName} />
              <InputField
                label="Location"
                placeholder="Location"
                value={location}
                onChange={setLocation}
              />
              <InputField
                label="Opening Time"
                placeholder="09:00"
                value={openingTime}
                onChange={setOpeningTime}
              />
              <InputField
                label="Closing Time"
                placeholder="20:00"
                value={closingTime}
                onChange={setClosingTime}
              />
              <InputField
                label="Phone Number"
                placeholder="Phone Number"
                value={phone}
                onChange={setPhone}
              />
              <div>
                <p className="text-white">Description</p>
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 w-full rounded text-black"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="border-2 border-custom-green p-3 rounded-lg"
            >
              Update Branch
            </button>
          </>
        )}
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string
  onChange: (newValue: string) => void;
}

export function InputField({ label, placeholder, value, onChange }: InputFieldProps) {
  return (
    <div>
      <p className="text-white">{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-black p-3 rounded w-full"
      />
    </div>
  );
}

export default BranchEditForm;
