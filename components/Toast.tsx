import React, { useState, useEffect } from 'react';

type ToastType = "info" | "error" | "success";

export interface ToastState {
    isOpen: boolean;
    message: string;
    type: ToastType;
}

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'error';
  isOpen: boolean;
  closeToast: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isOpen, closeToast }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, closeToast]);

  if (!isOpen) return null;

  const bgColor = {
    info: 'bg-blue',
    success: 'bg-[#6AD77E]',
    error: 'bg-red',
  }[type];

  return (
    <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-md text-white ${bgColor}`}>
      {message}
    </div>
  );
};

export default Toast;
