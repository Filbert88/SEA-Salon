import React from "react";
import Image from "next/image";

interface StylistCardProps {
  name: string;
  imageUrl: string | null;
  price: string;
}

export default function StylistCard({
  name,
  imageUrl,
  price
}: StylistCardProps) {

  function formatImageUrl(imageUrl:string) {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
     
      return `${imageUrl}`;
    }
  }
  const formattedImageUrl = imageUrl ? formatImageUrl(imageUrl) : '/tes.jpg'; 

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row gap-8 justify-center sm:justify-normal">
        <div className="flex flex-row justify-center">
          <div className="w-[250px] sm:w-[300px]">
            <Image
              className="aspect-[2/3] w-full rounded-xl"
              src={formattedImageUrl}
              alt={name}
              height={375}
              width={250}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center sm:justify-normal px-4 text-white">
          <div className="font-semibold text-3xl sm:text-5xl mb-6 text-center">
            {name}
          </div>
          <div className="flex flex-col text-xl sm:text-3xl">
            <strong>{price}</strong>
            <div className="text-3xl">Cut Prices</div>
          </div>
        </div>
      </div>
    </div>
  );
}
