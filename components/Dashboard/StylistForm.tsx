"use client"
import React, { useState } from "react";
import FileUploadButton from "./UploadButton";

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
}

const StylistForm = ({ branches }: BranchesProps) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  console.log("ini selected", selectedBranch);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const imageUrl = await uploadFileToCloudinary();
      console.log("Image URL after upload:", imageUrl);  

      const data = {
        name,
        price,
        branchId: selectedBranch || null,
        imageUrl
      }
  
      const response = await fetch('/api/admin/stylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); 
  
      if (response.ok) {
        console.log('Service added successfully:', result);
      } else {
        console.error('Error adding service:', result);
      }
    } catch(error){
      console.error('Failed to submit form:', error);
    }
   
  };

  const uploadFileToCloudinary = async () => {
    if (!file) return '';

    const { signature, timestamp } = await (await fetch('/api/signature')).json();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!apiKey || !cloudName) {
      console.error('Cloudinary API key or cloud name is not defined.');
      return '';
    }

    formData.append('api_key', apiKey);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log("ini data url",data.url);
      return response.ok ? data.url : '';

    } catch (error) {
      console.error('Error uploading file:', error);
      return '';
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Stylist</h2>
      <div className="flex flex-col text-black gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black p-3 rounded"
        />
        <FileUploadButton onFileSelect={setFile} />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-3 rounded"
        />
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
      </div>
      <button
        type="submit"
        className="border-2 border-custom-green p-3 rounded-lg"
      >
        Add Stylist
      </button>
    </form>
  );
};

export default StylistForm;
