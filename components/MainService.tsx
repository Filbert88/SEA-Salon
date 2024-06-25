import React from "react";
import Image from "next/image";

interface MainServiceProps {
  title: string;
  desc: string;
  imageUrl: string;
}

export default function MainService({
  title,
  desc,
  imageUrl,
}: MainServiceProps) {
  return (
    <div className="grid md:grid-cols-4 gap-8 p-6 min-h-[400px]">
      <div className="md:col-span-2 flex flex-col gap-4 justify-center items-center md:items-start md:ml-8">
        <div className="font-bold text-3xl sm:text-5xl md:text-start text-center">{title}</div>
        <div className="text-lg sm:text-xl text-justify">{desc}</div>
        <div className="flex flex-row gap-8">
          <button className="rounded-lg bg-custom-green text-black p-3">
            Learn More
          </button>
          <button className="rounded-lg bg-custom-green text-black p-3">
            See All
          </button>
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:col-span-2 relative w-full h-64 md:h-auto rounded-lg flex justify-items--end items-center">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg flex justify-items-end"
        />
      </div>
    </div>
  );
}
