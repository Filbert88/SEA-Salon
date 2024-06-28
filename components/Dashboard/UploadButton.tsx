import React, { useRef, useState } from 'react';

const FileUploadButton: React.FC<{ onFileSelect: (file: File) => void }> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onFileSelect(file); 
    }
  };

  return (
    <div className="p-4" onClick={() => fileInputRef.current?.click()}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex items-center justify-center p-5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
        <i className="fa fa-upload mr-2 text-gray-500"></i>
        <span className="text-gray-500">Upload Image</span>
      </div>
    </div>
  );
};

export default FileUploadButton;
