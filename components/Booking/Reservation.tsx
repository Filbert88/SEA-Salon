"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { MdBookOnline } from "react-icons/md";

interface Reservation {
  id: number;
  branchName: string;
  date: string;
  time: string;
  stylistName: string;
  totalPrice: string;
  services: string[];
  guests: string[];
}

interface ReservationsProps {
  reservations: Reservation[];
}

export default function ReservationsPage({ reservations }: ReservationsProps) {
  const router = useRouter();
  const handleNavigation = (url: string) => {
    router.push(url);
  };
  return (
    <div className="container mx-auto px-4 pt-32">
      <h1 className="text-4xl sm:text-5xl font-bold my-4 text-white text-center">
        Your Reservations
      </h1>
      {reservations.length === 0 ? (
        <div className="text-center flex items-center justify-center flex-col mt-6">
          <p className="text-white text-lg">No reservations yet.</p>
          <button
            className="p-3 bg-red rounded-lg flex items-center text-white mt-4"
            onClick={() => handleNavigation("/booking")}
          >
            <MdBookOnline className="mr-2" />
            Book Now
          </button>
        </div>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li
              key={reservation.id}
              className="text-black bg-white shadow-lg rounded-lg p-4 mb-4"
            >
              <h2 className="text-xl font-bold">
                Reservation at {reservation.branchName}
              </h2>
              <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
              <p>Time: {reservation.time}</p>
              <p>Stylist: {reservation.stylistName}</p>
              <p>
                Total Price: {Number(reservation.totalPrice).toLocaleString()}
              </p>
              <div>
                Services:
                {reservation.services.length > 0 ? (
                  <ul>
                    {reservation.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                ) : (
                  <span> -</span>
                )}
              </div>
              <div>
                Guests:
                {reservation.guests.length > 0 ? (
                  <ul>
                    {reservation.guests.map((guest, index) => (
                      <li key={index}>{guest}</li>
                    ))}
                  </ul>
                ) : (
                  <span> -</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
