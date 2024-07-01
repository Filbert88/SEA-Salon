"use client";
import React, { useState } from "react";
import FileUploadButton from "./UploadButton";
import Toast from "../Toast";
import { ToastState } from "../Toast";


interface Branch {
  id: number;
  name: string;
  openingTime: string;
  closingTime: string;
  location: string;
  phone: string;
  description: string;
}

interface BranchesProps {
  branches: Branch[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void
}

interface FormErrors {
  name?: string;
  duration?: string;
  file?: string;
  price?: string;
  description?: string;
  branches?: string;
}

const ServiceForm = ({ branches, setLoading,setToast }: BranchesProps) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBranches, setSelectedBranches] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleBranchSelect = (branchId: number) => {
    setSelectedBranches(prevSelected => {
      if (prevSelected.includes(branchId)) {
        return prevSelected.filter(id => id !== branchId);
      } else {
        return [...prevSelected, branchId];
      }
    });
  };

  console.log(selectedBranches);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!duration) newErrors.duration = "Duration is required";
    if (!price) newErrors.price = "Price is required";
    if (!description) newErrors.description = "Description is required";
    if (!file) newErrors.file = "File upload is required";
    if (selectedBranches.length === 0)
      newErrors.branches = "At least one branch must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({
        isOpen: true,
        message: "Please fill all the field to add a new service",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadFileToCloudinary();
      console.log("Image URL after upload:", imageUrl);

      const data = {
        name,
        duration,
        price,
        description,
        branchIds: selectedBranches,
        imageUrl,
      };

      const response = await fetch("/api/admin/services", {
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
          message: "Service added successfully",
          type: "success",
        });
        console.log("Service added successfully:", result);
      } else {
        setToast({ isOpen: true, message: result.error, type: "error" });
        console.error("Error adding service:", result);
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Failed to submit form",
        type: "error",
      });
      console.error("Failed to submit form:", error);
    } finally {
      setName("");
      setDuration("");
      setPrice("");
      setDescription("");
      setSelectedBranches([]);
      setFile(null);
      setLoading(false);
    }
  };

  const uploadFileToCloudinary = async () => {
    if (!file) return "";

    const { signature, timestamp } = await (
      await fetch("/api/signature")
    ).json();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!apiKey || !cloudName) {
      console.error("Cloudinary API key or cloud name is not defined.");
      return "";
    }

    formData.append("api_key", apiKey);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("ini data url", data.url);
      return response.ok ? data.url : "";
    } catch (error) {
      console.error("Error uploading file:", error);
      return "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Service</h2>
      <div className="flex flex-col text-black gap-2 w-full">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black p-3 rounded"
        />
        {errors.name && <p className="text-red">{errors.name}</p>}
        <input
          type="text"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="text-black p-3 rounded"
        />
        {errors.duration && <p className="text-red">{errors.duration}</p>}
        <FileUploadButton onFileSelect={setFile} />
        {errors.file && <p className="text-red">{errors.file}</p>}
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-black p-3 rounded"
        />
        {errors.price && <p className="text-red">{errors.price}</p>}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-black p-3 rounded"
        />
        {errors.description && <p className="text-red">{errors.description}</p>}
        <select
          onChange={(e) => handleBranchSelect(parseInt(e.target.value))}
          className="text-black p-3 rounded"
          defaultValue=""
        >
          <option disabled value="">
            Select Branches
          </option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        {errors.branches && <p className="text-red">{errors.branches}</p>}
        <div className="flex flex-wrap gap-2">
          {selectedBranches.map((branchId) => {
            const branch = branches.find((b) => b.id === branchId);
            return (
              <div
                key={branchId}
                className="flex items-center gap-2 bg-gray-400 rounded p-2"
              >
                {branch?.name}
                <button
                  type="button"
                  onClick={() => handleBranchSelect(branchId)}
                  className="text-white rounded-full px-2"
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="border-2 border-custom-green p-3 rounded-lg"
      >
        Add Service
      </button>
    </form>
  );
};

export default ServiceForm;
