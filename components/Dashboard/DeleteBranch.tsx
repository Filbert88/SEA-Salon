import React, { useState } from "react";
import { ToastState } from "../Toast";

interface Branch {
  id: number;
  name: string;
  openingTime: string;
  closingTime: string;
  location: string;
  phone: string;
  description: string;
}

interface DeleteBranchProps {
  branches: Branch[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void;
}

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { timeStyle: 'short' });
};

const DeleteBranch = ({
  branches,
  setLoading,
  setToast,
}: DeleteBranchProps) => {
  const [branchList, setBranchList] = useState<Branch[]>(branches);

  const handleDelete = async (branchesToDelete: Branch) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/delete/branch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ branchId: branchesToDelete.id }),
      });

      if (response.ok) {
        setBranchList(
          branchList.filter((branch) => branch.id !== branchesToDelete.id)
        );
        setToast({
          isOpen: true,
          message: "Branch deleted successfully",
          type: "success",
        });
        console.log("Branch deleted successfully");
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Error deleting branch",
        type: "error",
      });
      console.error("Failed to delete branch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="text-center text-3xl font-bold text-white">All Branches</div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {branchList.map((branch, index) => (
            <div key={branch.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold text-black">
                  {branch.name}
                </h5>
                <button
                  onClick={() => handleDelete(branch)}
                  className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {branch.phone}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Location:</span> {branch.location}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Opening Time:</span>{" "}
                {formatTime(branch.openingTime)}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Closing Time:</span>{" "}
                {formatTime(branch.closingTime)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteBranch;
