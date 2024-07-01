import React, { useState } from "react";
import FileUploadButton from "./UploadButton";
import Toast from "../Toast";
import { ToastState } from "../Toast";
import Loading from "../Loading";
import uploadFileToCloudinary from "@/app/utils";
import { InputField } from "./EditBranchForm";

interface Stylist {
  id: number;
  name: string;
  imageUrl: string | null;
  price: string;
}

interface StylistProps {
  stylists: Stylist[];
}

const StylistEditForm = ({ stylists }: StylistProps) => {
  const [selectedStylistId, setSelectedStylistId] = useState<number | null>(
    null
  );
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const handleStylistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value, 10);
    const selectedStylist = stylists.find((stylist) => stylist.id === id);
    if (selectedStylist) {
      setSelectedStylistId(id);
      setName(selectedStylist.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadFileToCloudinary(file);

      const data = {
        id:selectedStylistId,
        name,
        imageUrl,
        price,
      };

      const response = await fetch("/api/admin/edit/stylist", {
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
          message: "Stylist data updated successfully",
          type: "success",
        });
      } else {
        setToast({ isOpen: true, message: result.error, type: "error" });
        console.error("Error updating stylist:", result);
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Failed to submit form",
        type: "error",
      });
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div className="w-full  mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-white">Edit Stylist</h2>
        <div>
          <p className="text-white">Select Stylist</p>
          <select
            value={selectedStylistId ?? ""}
            onChange={handleStylistChange}
            className="p-3 w-full rounded text-black"
          >
            <option value="">Select a stylist</option>
            {stylists.map((stylist) => (
              <option key={stylist.id} value={stylist.id}>
                {stylist.name}
              </option>
            ))}
          </select>
        </div>
        {selectedStylistId && (
          <>
            <div className="space-y-4">
              <InputField
                label="Name"
                value={name}
                placeholder={name}
                onChange={setName}
              />
              <div>
                <p className="text-white">Image</p>
                <FileUploadButton onFileSelect={setFile} />
              </div>
              <InputField
                label="Price"
                placeholder="100000"
                value={price}
                onChange={setPrice}
              />
            </div>
            <button
              type="submit"
              className="border-2 border-custom-green p-3 rounded-lg"
            >
              Update Service
            </button>
          </>
        )}
        <Toast
          isOpen={toast.isOpen}
          message={toast.message}
          type={toast.type}
          closeToast={() => setToast({ ...toast, isOpen: false })}
        />
      </form>
    </div>
  );
};

export default StylistEditForm;
