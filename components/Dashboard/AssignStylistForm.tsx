import React, { useState } from "react";
import Toast from "../Toast";
import { ToastState } from "../Toast";

interface Stylist {
  id: number;
  name: string;
  price: string;
}

interface Branch {
  id: number;
  name: string;
}

interface AssignStylistFormProps {
  unassignedStylists: Stylist[];
  branches: Branch[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void; 
}

interface FormErrors {
  name?: string;
  branch?: string;
}

const AssignStylistForm = ({
  unassignedStylists,
  branches,
  setLoading,
  setToast
}: AssignStylistFormProps) => {
  const [selectedStylists, setSelectedStylists] = useState<number[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (selectedStylists.length === 0)
      newErrors.name = "At least one stylist must be selected";
    if (!selectedBranch) newErrors.branch = "Branch must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({
        isOpen: true,
        message: "Please fill all the required fields to add a new stylist",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const data = {
        stylistIds: selectedStylists,
        branchId: selectedBranch,
      };

      const response = await fetch("/api/admin/stylist/assign", {
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
          message: "Stylists assigned successfully",
          type: "success",
        });
        console.log("Stylists assigned successfully:", result);
      } else {
        setToast({ isOpen: true, message: result.error, type: "error" });
        console.error("Error assigning stylists:", result);
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setSelectedStylists([]);
      setSelectedBranch(null);
      setLoading(false);
    }
  };

  const handleStylistSelect = (stylistId: number) => {
    setSelectedStylists((prevSelected) =>
      prevSelected.includes(stylistId)
        ? prevSelected.filter((id) => id !== stylistId)
        : [...prevSelected, stylistId]
    );
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Assign Stylists to Branch</h2>
      <div className="flex flex-col text-black gap-2">
        {unassignedStylists.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {unassignedStylists.map((stylist) => (
              <div
                key={stylist.id}
                className={`flex items-center gap-2 bg-gray-400 rounded p-2 cursor-pointer ${
                  selectedStylists.includes(stylist.id) ? "bg-blue-400" : ""
                }`}
                onClick={() => handleStylistSelect(stylist.id)}
              >
                {stylist.name} ({formatRupiah(Number(stylist.price))})
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Currently, there are no free stylists available to be assigned to a
            branch.
          </p>
        )}
        {errors.name && <p className="text-red">{errors.name}</p>}

        <select
          value={selectedBranch || ""}
          onChange={(e) => setSelectedBranch(e.target.value || null)}
          className="rounded p-3"
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id.toString()}>
              {branch.name}
            </option>
          ))}
        </select>

        {errors.branch && <p className="text-red">{errors.branch}</p>}
      </div>
      <button
        type="submit"
        className="border-2 border-custom-green p-3 rounded-lg text-white"
      >
        Assign Stylists
      </button>

    </form>
  );
};

export default AssignStylistForm;
