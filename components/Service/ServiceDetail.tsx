"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";

interface serviceDetailProps {
  name: string;
  imageUrl: string;
  description: string;
  price: string;
}
const ServiceDetailComponent = ({
  name,
  imageUrl,
  description,
  price,
}: serviceDetailProps) => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center mt-32 px-10 md:px-20 lg:px-40 ">
      <h1 className="text-6xl text-white text-center font-bold">OUR SERVICES</h1>
      <div className="w-full mt-4 text-white">
        <div className="relative min-h-[500px]">
          <Image src={imageUrl} alt={name} layout="fill" />
        </div>
        <h2 className="text-4xl mt-6 font-bold">{name}</h2>
        <p className="mt-2">{description}</p>
        <p className="font-bold text-2xl mt-2 mb-8">Price Start From {price}</p>
      </div>
    </div>
  );
};

export default ServiceDetailComponent;
