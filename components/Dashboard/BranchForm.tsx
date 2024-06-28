"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import NoBranchStylistForm from "./StylistNForm";

interface Stylist {
  id: number;
  name: string;
}

interface BranchFormProps {
  unassignedStylists: Stylist[];
}

const BranchForm: React.FC<BranchFormProps> = ({ unassignedStylists }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStylists, setSelectedStylists] = useState<number[]>([]);

  const handleStylistSelect = (stylistId: number) => {
    if (selectedStylists.includes(stylistId)) {
      setSelectedStylists(selectedStylists.filter((id) => id !== stylistId));
    } else {
      setSelectedStylists([...selectedStylists, stylistId]);
    }
  };

  console.log("apa ini",selectedStylists)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const branch = {
      name,
      location,
      openingTime,
      closingTime,
      description,
      phone,
      selectedStylists
    };

    const response = await fetch("/api/admin/branches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(branch),
    });

    if (response.ok) {
      console.log("Branch added successfully");
    } else {
      console.error("Error adding branch");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Add New Branch</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Branch Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black p-3 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-black p-3 rounded"
          />
          <input
            type="text"
            placeholder="Opening Time"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="text-black p-3 rounded"
          />
          <input
            type="text"
            placeholder="Closing Time"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="text-black p-3 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-black p-3 rounded"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-black p-3 rounded"
          />
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
          <div className="flex flex-wrap gap-2">
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

        <button
          type="submit"
          className="border-2 border-custom-green p-3 rounded-lg"
        >
          Add Branch
        </button>
        {unassignedStylists.length === 0 && (
          <div>
            <p className="text-red-500">
              No unassigned stylists available. Please add a stylist first.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
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
