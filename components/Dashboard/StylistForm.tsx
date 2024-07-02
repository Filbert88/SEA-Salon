"use client";
import React, { useState } from "react";
import FileUploadButton from "./UploadButton";
import Toast from "../Toast";
import { ToastState } from "../Toast";
import Loading from "../Loading";

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
  price?: string;
  file?: string;
}

const StylistForm = ({ branches, setLoading, setToast }: BranchesProps) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  console.log("ini selected", selectedBranch);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!price) newErrors.price = "Price is required";
    if (!file) newErrors.file = "An image file is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({
        isOpen: true,
        message: "Please fill all the required field to add a new stylist",
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
        price,
        branchId: selectedBranch || null,
        imageUrl,
      };

      const response = await fetch("/api/admin/stylist", {
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
          message: "Stylist added successfully",
          type: "success",
        });
        console.log("Stylist added successfully:", result);
      } else {
        setToast({ isOpen: true, message: result.error, type: "error" });
        console.error("Error adding stylist:", result);
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    }finally{
      setName("");
      setPrice("");
      setFile(null);
      setSelectedBranch(null);
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

  const InfoIcon = () => (
    <div className="relative flex items-center group hover:cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h1m0 0h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg>
      <span
        className="absolute p-2 text-xs text-white bg-black border-custom-green border-2 rounded-md shadow-lg left-1/2 transform -translate-x-1/2 -translate-y-9 -mt-8  hidden group-hover:block"
        style={{ minWidth: "150px" }}
      >
        It is not required to assign a stylist to a branch.
      </span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Add New Stylist</h2>
      <div className="flex flex-col text-black gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black p-3 rounded"
        />
        {errors.name && <p className="text-red">{errors.name}</p>}
        <FileUploadButton onFileSelect={setFile} />
        {errors.file && <p className="text-red">{errors.file}</p>}
        <input
          type="text"
          placeholder="Price (188000)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-3 rounded"
        />
        {errors.price && <p className="text-red">{errors.price}</p>}
        <div className="flex flex-row w-full gap-4">
          <select
            value={selectedBranch || ""}
            onChange={(e) => setSelectedBranch(e.target.value || null)}
            className="rounded p-3"
          >
            <option value="">No Branch Assigned</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id.toString()}>
                {branch.name}
              </option>
            ))}
          </select>
          <InfoIcon />
        </div>
      </div>
      <button
        type="submit"
        className="border-2 border-custom-green p-3 rounded-lg text-white"
      >
        Add Stylist
      </button>
    </form>
  );
};

export default StylistForm;
