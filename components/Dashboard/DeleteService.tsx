import React, { useState,useEffect } from "react";
import { Service } from "./Dashboard";
import { ToastState } from "../Toast";

interface DeleteServiceProps {
  services: Service[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void;
}

const DeleteService = ({
  services,
  setLoading,
  setToast,
}: DeleteServiceProps) => {
  
  const [serviceList, setServiceList] = useState<Service[]>(services);

  useEffect(() => {
    console.log('Service list updated:', serviceList);
  }, [serviceList]);

  const handleDelete = async (servicesToDelete: Service) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/delete/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId: servicesToDelete.id }),
      });

      if (response.ok) {
        setServiceList(
          serviceList.filter((service) => service.id !== servicesToDelete.id)
        );
        setToast({
          isOpen: true,
          message: "Service deleted successfully",
          type: "success",
        });
        console.log("Service deleted successfully");
      } else {
        setToast({
          isOpen: true,
          message: "Error deleting service",
          type: "error",
        });
        console.error("Failed to delete service");
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Error deleting service",
        type: "error",
      });
      console.error("Failed to delete service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="text-center text-3xl font-bold">All Services</div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceList.map((service) => (
            <div key={service.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold text-black">
                  {service.name}
                </h5>
                <button
                  onClick={() => handleDelete(service)}
                  className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
              <div className="text-gray-600">
                <span className="font-medium line-clamp-2">Description:</span>
                <div className="line-clamp-2">{service.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteService;
