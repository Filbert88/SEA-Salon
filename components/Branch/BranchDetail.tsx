"use client";
import StylistCard from "@/components/Branch/StylistCard";
import React from "react";
import { useRouter } from "next/navigation";

import {
  MdBookOnline,
  MdAccessTime,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";

interface Stylist {
  id: number;
  name: string;
  imageUrl: string | null;
  price: string;
}

interface BranchDetails {
  name: string;
  description: string;
  openingTime: Date;
  closingTime: Date;
  location: string;
  phone: string;
  stylists: Stylist[];
}

const BranchDetailComponent: React.FC<BranchDetails> = ({
  name,
  description,
  openingTime,
  closingTime,
  location,
  phone,
  stylists,
}) => {
  const router = useRouter();

  const formatTime = (date: Date) => {
    const utcDate = new Date(date);

    const utcHours = utcDate.getUTCHours();

    utcDate.setHours(utcHours + 7);

    return utcDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getGoogleMapsEmbedUrl = (location: string) => {
    const formattedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps?q=${formattedLocation}&output=embed`;
  };

  const googleMapsSrc = getGoogleMapsEmbedUrl(location);

  const handleNavigation = (url: string) => {
    router.push(url);
  };
  return (
    <div className="flex justify-center items-center flex-col pt-32 px-4">
      <div className="max-w-6xl w-full">
        <div>
          <h1 className="font-bold text-3xl sm:text-5xl text-center text-white mb-4 ">
            SEA SALON {name}
          </h1>
          <p className="text-xl text-white text-justify leading-tight">{description}</p>
        </div>
        <div className="mt-8">
          <iframe
            src={googleMapsSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="border-2 border-white mt-8">
          <div className="border-b-2 border-white flex justify-center flex-col items-center p-2">
            <div className="text-2xl font-bold text-white text-center">
              SEA SALON - {name}
            </div>
            <div className="flex justify-center flex-row mt-4 mb-4">
              <button
                className="p-3 bg-red rounded-lg flex items-center text-white"
                onClick={() => handleNavigation("/booking")}
              >
                <MdBookOnline className="mr-2" />
                Book Now
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 px-4 text-white pb-2">
            <div className="flex flex-row items-center gap-2">
              <div>
                <MdAccessTime className="mr-2" size={24} />
              </div>
              <div>
                {formatTime(openingTime)} - {formatTime(closingTime)}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div>
                <MdPhone className="mr-2" size={24} />
              </div>
              <div>{phone}</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div>
                <MdLocationOn className="mr-2" size={24} />
              </div>
              <div>{location}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-16">
          <div className="text-6xl text-center mb-8 font-bold text-white">
            Our Stylist
          </div>
          {stylists.map((stylist) => (
            <StylistCard
              key={stylist.id}
              name={stylist.name}
              imageUrl={stylist.imageUrl}
              price={stylist.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchDetailComponent;
