import React, { useState } from "react";
import ReservationDetails from "@/lib/type";
import { ToastState } from "../Toast";

interface ReservationProps {
  reservations: ReservationDetails[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void
}

const DeleteReservation = ({ reservations, setLoading, setToast }: ReservationProps) => {
  const [reservationList, setReservationsList] =
    useState<ReservationDetails[]>(reservations);

  const handleDelete = async (reservationsToDelete: ReservationDetails) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/delete/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservationId: reservationsToDelete.id }),
      });

      if (response.ok) {
        setReservationsList(
          reservationList.filter(
            (reservation) => reservation.id !== reservationsToDelete.id
          )
        );
        setToast({
          isOpen: true,
          message: "Reservation deleted successfully",
          type: "success",
        });
      }
    } catch (error) {
      setToast({
        isOpen: true,
        message: "Error deleting reservation",
        type: "error",
      });
      console.error("Error deleting reservation:", error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="text-center text-3xl font-bold text-white">All Reservations</div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reservationList.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold text-black">
                  {reservation.user.fullName}
                </h5>
                <button
                  onClick={() => handleDelete(reservation)}
                  className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Branch:</span>{" "}
                {reservation.branch.name}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Services:</span>{" "}
                <ul>
                  {reservation.services.map((service, i) => (
                    <li key={i}>{service.service.name}</li>
                  ))}
                </ul>
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Stylist:</span>{" "}
                {reservation.stylist.name}
              </p>

              <p className="text-gray-800">
                <span className="font-medium">Date:</span>{" "}
                {new Date(reservation.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteReservation;
