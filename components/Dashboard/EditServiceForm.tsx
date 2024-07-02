import React, { useState } from "react";
import FileUploadButton from "./UploadButton";
import Toast from "../Toast";
import { ToastState } from "../Toast";
import Loading from "../Loading";
import uploadFileToCloudinary from "@/app/utils";
import { InputField } from "./EditBranchForm";

interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  price: string;
}

interface ServiceProps {
  services: Service[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void
}

const ServiceEditForm = ({ services, setLoading, setToast }: ServiceProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value, 10);
    const selectedService = services.find((service) => service.id === id);
    if (selectedService) {
      setSelectedServiceId(id);
      setName(selectedService.name);
      setDescription(selectedService.description);
      setPrice(selectedService.price);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const imageUrl = await uploadFileToCloudinary(file);

      const data = {
        id: selectedServiceId,
        name,
        description,
        price,
        imageUrl,
      };

      const response = await fetch("/api/admin/edit/service", {
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
          message: "Service updated successfully",
          type: "success",
        });
      } else {
        setToast({ isOpen: true, message: result.error, type: "error" });
        console.error("Error updating service:", result);
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
    <div className=" mt-10 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-white">Edit Service</h2>
        <div>
          <p className="text-white">Select Service</p>
          <select
            value={selectedServiceId ?? ""}
            onChange={handleServiceChange}
            className="p-3 w-full rounded text-black"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        {selectedServiceId && (
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
                value={price}
                placeholder="150000"
                onChange={setPrice}
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
              className="border-2 border-custom-green p-3 rounded-lg text-white"
            >
              Update Service
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ServiceEditForm;
