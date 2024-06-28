import React from "react";

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
  return (
    <div className="container mx-auto px-4 pt-32">
      <h1 className="text-2xl font-bold my-4 text-white text-center">Your Reservations</h1>
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
            <p>Total Price: {Number(reservation.totalPrice).toLocaleString()}</p>
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
    </div>
  );
}
