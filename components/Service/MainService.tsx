import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MainServiceProps {
  title: string;
  desc: string;
  imageUrl: string;
}

export default function MainServiceComponent({
  title,
  desc,
  imageUrl,
}: MainServiceProps) {
  const router = useRouter();
  const handleNavigation = () => {
    router.push(`/service/${title}`);
  };
  const handleSeeAll = () => {
    router.push("/service")
  }
  return (
    <div className="grid md:grid-cols-4 gap-8 p-6 min-h-[400px]">
      <div className="md:col-span-2 flex flex-col gap-4 justify-center items-center md:items-start md:ml-8">
        <div className="font-bold text-3xl sm:text-5xl md:text-start text-center text-white">
          {title}
        </div>
        <div className="text-lg sm:text-xl text-justify text-white line-clamp-3">
          {desc}
        </div>
        <div className="flex flex-row gap-8">
          <button className="rounded-lg bg-custom-green text-black p-3" onClick={handleNavigation}>
            Learn More
          </button>
          <button className="rounded-lg bg-custom-green text-black p-3" onClick={handleSeeAll}>
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
