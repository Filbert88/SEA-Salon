import React from "react";
import Image from "next/image";

export default function StylistCard() {
  return (
    <div>
      <div className="text-6xl text-center mb-8 font-bold">Our Stylist</div>
      <div className="flex flex-col sm:flex-row gap-8 justify-center sm:justify-normal">
        <div className="flex flex-row justify-center">
          <div className="w-[250px] sm:w-[300px]">
            <Image
              className="aspect-[2/3] w-full rounded-xl"
              src="/tes.jpg"
              alt="tes"
              height={375}
              width={250}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center sm:justify-normal">
          <div className="font-semibold text-3xl sm:text-5xl mb-6 text-center">
            Irwan Simanjuntak Tobing
          </div>
          <div className="flex flex-col text-xl sm:text-3xl">
            <strong>1293K</strong>
            <div className="text-3xl">Female Hair Cut</div>
          </div>
          <div className="flex flex-col mt-4 text-xl sm:text-3xl">
            <strong>1293K</strong>
            <div className="text-3xl">Male Hair Cut</div>
          </div>
        </div>
      </div>
    </div>
  );
}
