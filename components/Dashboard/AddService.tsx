import React, { useState } from "react";
import Modal from "../Modal"; // Assuming Modal is being used somewhere or remove if unnecessary
import Toast from "../Toast";
import { ToastState } from "../Toast";

interface Stylist {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  name: string;
}

interface BranchFormProps {
  services: Service[];
  branches: Branch[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void;
}

interface FormErrors {
  service?: string;
  branches?: string;
}

const AddServiceToBranch: React.FC<BranchFormProps> = ({
  services,
  branches,
  setLoading,
  setToast,
}) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBranches, setSelectedBranches] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  console.log(selectedService)
  const handleBranchSelect = (branchId: number) => {
    if (selectedBranches.includes(branchId)) {
      setSelectedBranches(selectedBranches.filter(id => id !== branchId));
    } else {
      setSelectedBranches([...selectedBranches, branchId]);
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (selectedService === "") {
      newErrors.service = "A service must be selected.";
    }
    if (selectedBranches.length === 0) {
      newErrors.branches = "At least one branch must be selected.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({
        isOpen: true,
        message: "Please fill all the fields to add a service to branches",
        type: "error",
      });
      return;
    }

    const branchData = {
      serviceId: Number(selectedService),
      branches: selectedBranches,
    };

    setLoading(true);
    try {
        const response = await fetch("/api/admin/services/branch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(branchData),
        });
    
        const data = await response.json(); 

        if (response.ok) {
          setToast({
            isOpen: true,
            message: "Service added to branches successfully",
            type: "success",
          });
        } else {
          setToast({
            isOpen: true,
            message: data.message, 
            type: "error",
          });
        }
      } catch (error) {
        setToast({
          isOpen: true,
          message: "Failed adding service to branches",
          type: "error",
        });
      } finally {
        setLoading(false);
      } 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Add Service to Branch</h2>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="rounded p-3 text-black"
        >
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.id} value={service.id.toString()}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red">{errors.service}</p>}

        <div>
          <p className="text-white">Branches:</p>
          {branches.map(branch => (
            <div key={branch.id} className="gap-2">
              <input
                type="checkbox"
                id={`branch-${branch.id}`}
                checked={selectedBranches.includes(branch.id)}
                onChange={() => handleBranchSelect(branch.id)}
              />
              <label htmlFor={`branch-${branch.id}`} className="ml-2 text-white">{branch.name}</label>
            </div>
          ))}
          {errors.branches && <p className="text-red-500">{errors.branches}</p>}
        </div>

        <button type="submit" className="border-2 text-white border-custom-green p-3 rounded-lg">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceToBranch;
