"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const handleBookNowClick = () => {
    router.push('/booking');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bottom-20">
      <div className="flex flex-col items-center text-center">
        <div className=" text-5xl sm:text-7xl font-bold mt-10 mb-3">
          Welcome to SEA Salon
        </div>
        <div className="text-xl italic mb-1">#1 Salon in Indonesia</div>
        <div className="text-3xl font-semibold mb-3">
          Beauty and Elegance Redefined
        </div>
        <div className="text-center max-w-2xl mb-5">
          We are dedicated to delivering the highest level of professionalism,
          expertise, and innovation in the salon industry. Our highly skilled
          team of stylists, stay up-to-date with the latest trends, techniques,
          and products to ensure that our clients receive the best possible
          service and results.
        </div>
        <div className="flex flex-row gap-8 mt-4">
          <button className="rounded-lg bg-custom-green text-black py-3 px-3" onClick={handleBookNowClick}>
            Book Now
          </button>
          <button className="rounded-lg bg-custom-green text-black py-3 px-3">
            Customer Service
          </button>
        </div>
      </div>
    </div>
  );
}
