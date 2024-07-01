import React, { useRef, useState } from 'react';

const FileUploadButton: React.FC<{ onFileSelect: (file: File) => void }> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null); // State to store the filename

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onFileSelect(file); 
      setFileName(file.name); // Update the filename state
    }
  };

  return (
    <div onClick={() => fileInputRef.current?.click()}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".jpg, .jpeg, .png" // Limiting file types to JPEG, JPG, and PNG
      />
      <div className="flex items-center justify-center p-5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
        <i className="fa fa-upload mr-2 text-gray-500"></i>
        <span className="text-gray-500">{fileName || 'Upload Image'}</span> {/* Display filename if available */}
      </div>
    </div>
  );
};

export default FileUploadButton;
