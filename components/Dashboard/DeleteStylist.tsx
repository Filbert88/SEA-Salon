import React, { useState, useEffect } from "react";
import { ToastState } from "../Toast";
import { Stylist } from "./Dashboard";

interface DeleteStylistProps {
  stylists: Stylist[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void;
}

const DeleteStylist = ({
  stylists,
  setLoading,
  setToast,
}: DeleteStylistProps) => {
  const [stylistList, setStylistList] = useState<Stylist[]>(stylists);

  const handleDelete = async (stylistsToDelete: Stylist) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/delete/stylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stylistId: stylistsToDelete.id }),
      });

      if (response.ok) {
        setStylistList(
          stylistList.filter((stylist) => stylist.id !== stylistsToDelete.id)
        );
        setToast({
          isOpen: true,
          message: "Stylist deleted successfully",
          type: "success",
        });
        console.log("Stylist deleted successfully");
      }else{
        setToast({
          isOpen: true,
          message: "Error deleting stylist",
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Error deleting stylist",
        type: "error",
      });
      console.error("Failed to delete stylist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="text-center text-3xl font-bold">All Stylists</div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stylistList.map((stylist) => (
            <div key={stylist.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold text-black">
                  {stylist.name}
                </h5>
                <button
                  onClick={() => handleDelete(stylist)}
                  className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Rates:</span> {stylist.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteStylist;
