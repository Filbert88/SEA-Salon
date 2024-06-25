import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-[#141414] p-5 rounded-lg relative">
        <button onClick={onClose} className="absolute top-2 right-5 text-2xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
