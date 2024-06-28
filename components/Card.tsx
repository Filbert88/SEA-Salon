import React from "react";
import Image from "next/image";
import Link from "next/link";

interface cardProps{
    title: string,
    href: string,
    imageUrl: string | null,
}
const Card = ({ title , href, imageUrl} : cardProps) => {

  function formatImageUrl(imageUrl:string) {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
     
      return `${imageUrl}`;
    }
  }
  const formattedImageUrl = imageUrl ? formatImageUrl(imageUrl) : '/tes.jpg'; 
  
  return (
    <Link href={`/service/${href}`}>
        <div className="cursor-pointer relative">
      <div className="flex flex-col items-center">
        <div className="w-[250px] relative">
          <Image
            className="aspect-[2/3] w-full rounded-xl"
            src={formattedImageUrl}
            alt={title}
            height={375}
            width={250}
            objectFit="cover"
          />
          <div className="absolute left-0 right-0 bottom-2 flex items-center justify-center">
            <span className="text-white text-xl font-black p-2 rounded-md">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
    </Link>

  );
};

export default Card;
