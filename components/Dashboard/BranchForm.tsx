"use client";
import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import NoBranchStylistForm from "./StylistNForm";
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

interface BranchFormProps {
  unassignedStylists: Stylist[];
  services: Service[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void;
}

interface FormErrors {
  name?: string;
  location?: string;
  openingTime?: string;
  closingTime?: string;
  description?: string;
  phone?: string;
  stylists?: string;
  services?: string;
}

const validateTimeFormat = (time:string) => {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(time);
};

const BranchForm: React.FC<BranchFormProps> = ({
  unassignedStylists,
  services,
  setLoading,
  setToast,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStylists, setSelectedStylists] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  console.log("service:", selectedServices)

  useEffect(() => {
    const essentialServices = [
      "Haircuts and Styling",
      "Manicure and Pedicure",
      "Facial Treatments",
    ];
    const essentialServiceIds = services
      .filter((service) => essentialServices.includes(service.name))
      .map((service) => service.id);

    setSelectedServices((prev) =>
      Array.from(new Set([...prev, ...essentialServiceIds]))
    );
  }, [services]);

  const handleServiceSelect = (serviceId: number) => {
    if (!selectedServices.includes(serviceId)) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      const essentialServices = [
        "Haircuts and Styling",
        "Manicure and Pedicure",
        "Facial Treatments",
      ];
      const service = services.find((s) => s.id === serviceId);
      if (service && !essentialServices.includes(service.name)) {
        setSelectedServices(selectedServices.filter((id) => id !== serviceId));
      }
    }
  };

  const handleStylistSelect = (stylistId: number) => {
    if (selectedStylists.includes(stylistId)) {
      setSelectedStylists(selectedStylists.filter((id) => id !== stylistId));
    } else {
      setSelectedStylists([...selectedStylists, stylistId]);
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "Branch name is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!openingTime) {
      newErrors.openingTime = "Opening time is required.";
    } else if (!validateTimeFormat(openingTime)) {
      newErrors.openingTime = "Opening time must be in HH:mm format.";
    }
    if (!closingTime) {
      newErrors.closingTime = "Closing time is required.";
    } else if (!validateTimeFormat(closingTime)) {
      newErrors.closingTime = "Closing time must be in HH:mm format.";
    }
    if (!description) newErrors.description = "Description is required.";
    if (!phone) newErrors.phone = "Phone number is required.";
    if (selectedStylists.length === 0)
      newErrors.stylists = "At least one stylist must be selected.";
    setErrors(newErrors);
    if (selectedServices.length < 3)
      newErrors.services = "At least three services must be selected.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log("apa ini", selectedStylists);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({
        isOpen: true,
        message: "Please fill all the field to add a new branch",
        type: "error",
      });
      return;
    }

    const branch = {
      name,
      location,
      openingTime,
      closingTime,
      description,
      phone,
      selectedStylists,
      selectedServices,
    };

    setLoading(true);
    const response = await fetch("/api/admin/branches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(branch),
    });

    if (response.ok) {
      setToast({
        isOpen: true,
        message: "Branch added successfully",
        type: "success",
      });
      console.log("Branch added successfully");
    } else {
      setToast({
        isOpen: true,
        message: "Error adding branch",
        type: "error",
      });
      console.error("Error adding branch");
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Add New Branch</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Branch Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black p-3 rounded"
          />
          {errors.name && <p className="text-red">{errors.name}</p>}
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-black p-3 rounded"
          />
          {errors.location && <p className="text-red">{errors.location}</p>}
          <input
            type="text"
            placeholder="Opening Time (09:00)"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="text-black p-3 rounded"
          />
          {errors.openingTime && (
            <p className="text-red">{errors.openingTime}</p>
          )}
          <input
            type="text"
            placeholder="Closing Time (20:00)"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="text-black p-3 rounded"
          />
          {errors.closingTime && (
            <p className="text-red">{errors.closingTime}</p>
          )}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black p-3 rounded"
          />
          {errors.description && (
            <p className="text-red">{errors.description}</p>
          )}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-black p-3 rounded"
          />
          {errors.phone && <p className="text-red">{errors.phone}</p>}
          <div>
            <label htmlFor="services" className="block mb-2 text-white mt-1">
              Services
            </label>
            <select
              className="text-black p-3 rounded"
              onChange={(e) => handleServiceSelect(Number(e.target.value))}
            >
              <option disabled selected>
                Select Services
              </option>
              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                  disabled={
                    selectedServices.includes(service.id) &&
                    [
                      "Haircuts and Styling",
                      "Manicure and Pedicure",
                      "Facial Treatments",
                    ].includes(service.name)
                  }
                >
                  {service.name}
                </option>
              ))}
            </select>
            {errors.services && (
              <p className="text-red-500">{errors.services}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedServices.map((serviceId) => {
                const service = services.find((s) => s.id === serviceId);
                return (
                  <div
                    key={serviceId}
                    className="flex items-center gap-2 bg-gray-400 rounded p-2"
                  >
                    {service?.name}
                    <button
                      type="button"
                      onClick={() => handleServiceSelect(serviceId)}
                      className="text-white rounded-full px-2"
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-white mt-1">Stylists</div>
            <select
              onChange={(e) => {
                handleStylistSelect(parseInt(e.target.value));
              }}
              className="text-black p-3 rounded"
            >
              <option disabled selected>
                Select Stylists
              </option>
              {unassignedStylists.map((stylist) => (
                <option key={stylist.id} value={stylist.id}>
                  {stylist.name}
                </option>
              ))}
            </select>
            {errors.stylists && <p className="text-red">{errors.stylists}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedStylists.map((stylistId) => {
                const stylist = unassignedStylists.find(
                  (s) => s.id === stylistId
                );
                return (
                  <div
                    key={stylistId}
                    className="flex items-center gap-2 bg-gray-400 rounded p-2"
                  >
                    {stylist?.name}
                    <button
                      type="button"
                      onClick={() => handleStylistSelect(stylistId)}
                      className=" text-white rounded-full px-2"
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="border-2 border-custom-green p-3 rounded-lg text-white"
        >
          Add Branch
        </button>
        {unassignedStylists.length === 0 && (
          <div>
            <p className="text-red">
              No unassigned stylists available. Please add a stylist first.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-2 px-2 py-3 border-2 border-custom-green text-white rounded-lg"
            >
              Add Stylist
            </button>
          </div>
        )}
      </form>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <NoBranchStylistForm />
      </Modal>
    </div>
  );
};

export default BranchForm;
