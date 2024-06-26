import React from "react";
import Image from "next/image";

interface StylistCardProps {
  name: string;
  imageUrl: string | null;
  maleCutPrice: string;
  femaleCutPrice: string;
}

export default function StylistCard({
  name,
  imageUrl,
  maleCutPrice,
  femaleCutPrice,
}: StylistCardProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row gap-8 justify-center sm:justify-normal">
        <div className="flex flex-row justify-center">
          <div className="w-[250px] sm:w-[300px]">
            <Image
              className="aspect-[2/3] w-full rounded-xl"
              src={imageUrl || "/tes.jpg"}
              alt={name}
              height={375}
              width={250}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center sm:justify-normal px-4">
          <div className="font-semibold text-3xl sm:text-5xl mb-6 text-center">
            {name}
          </div>
          <div className="flex flex-col text-xl sm:text-3xl">
            <strong>{femaleCutPrice}</strong>
            <div className="text-3xl">Female Hair Cut</div>
          </div>
          <div className="flex flex-col mt-4 text-xl sm:text-3xl">
            <strong>{maleCutPrice}</strong>
            <div className="text-3xl">Male Hair Cut</div>
          </div>
        </div>
      </div>
    </div>
  );
}
