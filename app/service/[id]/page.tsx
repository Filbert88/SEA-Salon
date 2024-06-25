"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";

type ServiceType = "hair-coloring" | "styling";

const serviceDetails: Record<
  ServiceType,
  { name: string; description: string; price: string }
> = {
  "hair-coloring": {
    name: "Hair Coloring",
    description: "Full hair coloring services.",
    price: "$50",
  },
  styling: {
    name: "Styling",
    description: "Professional hair styling.",
    price: "$40",
  },
};

const ServiceDetailPage = () => {
  const router = useRouter();
  // const { id } = router.query;

  useEffect(() => {
    console.log("Router data:", router);
  }, [router]);

  // if (!id || typeof id !== 'string' || !(id in serviceDetails)) {
  //   return <p>Service not found!</p>;
  // }

  // const service = serviceDetails[id as ServiceType];

  return (
    <div className="min-h-full flex flex-col items-center justify-center mt-32 px-40 ">
      <h1 className="text-6xl">OUR SERVICES</h1>
      <div className="w-full mt-4">
        <div className="relative min-h-[500px]">
          <Image src="/tes.jpg" alt="tes" layout="fill" />
        </div>
        <h2 className="text-4xl mt-6 font-bold">Hair Cut</h2>
        <p className="mt-2">
          Experience the Ultimate Hair Transformation at Our Salon 
          At Irwan Team
          Hairdesign, we offer top-notch hair cutting services that will leave
          you looking and feeling your best. Our skilled team of hairstylists is
          dedicated to helping you achieve the perfect haircut that suits your
          style and enhances your natural beauty. Whether you're looking for a
          classic, trendy, or unique haircut, we've got you covered. Our experts
          stay up-to-date with the latest hair trends and techniques to provide
          you with the best possible service. We take the time to listen to your
          preferences and offer personalized consultations to ensure you get the
          haircut you desire. Why choose our hair cutting services? - Highly
          trained and experienced hairstylists - A wide range of haircut styles
          and options - Precision cutting for a flawless finish - Exceptional
          customer service - Clean and comfortable salon environment -
          Affordable pricing Say goodbye to bad hair days and hello to
          confidence with a fresh haircut from [Your Salon Name]. Book your
          appointment today and experience the difference for yourself!
        </p>
        <p className="font-bold text-2xl mt-2 mb-8">Price Start From Rp 250.000,00</p>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
