"use client"
import React, { useState } from 'react';
import FileUploadButton from './UploadButton';

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

const ServiceForm = ({ branches }: BranchesProps) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBranches, setSelectedBranches] = useState<number[]>([]);

  const handleBranchSelect = (branchId: number) => {
    if (selectedBranches.includes(branchId)) {
      setSelectedBranches(selectedBranches.filter(id => id !== branchId));
    } else {
      setSelectedBranches([...selectedBranches, branchId]);
    }
  };

  console.log(selectedBranches);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const imageUrl = await uploadFileToCloudinary();
      console.log("Image URL after upload:", imageUrl);  
  
      const data = {
        name,
        duration,
        price,
        description,
        branchIds: selectedBranches,
        imageUrl  
      };
  
      const response = await fetch('/api/services', {
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
    } catch (error) {
      console.error('Failed to submit form or upload image:', error);
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
      <h2 className="text-xl font-semibold">Add New Service</h2>
      <div className="flex flex-col text-black gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black p-3 rounded"
        />
        <input
          type="text"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="text-black p-3 rounded"
        />
        <FileUploadButton onFileSelect={setFile} />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-black p-3 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-black p-3 rounded"
        />
        <select
          onChange={(e) => handleBranchSelect(parseInt(e.target.value))}
          className="text-black p-3 rounded"
        >
          <option disabled selected>Select Branches</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2">
          {selectedBranches.map(branchId => {
            const branch = branches.find(b => b.id === branchId);
            return (
              <div key={branchId} className="flex items-center gap-2 bg-gray-200 rounded p-2">
                {branch?.name}
                <button type="button" onClick={() => handleBranchSelect(branchId)} className="bg-red-500 text-white rounded-full px-2">X</button>
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