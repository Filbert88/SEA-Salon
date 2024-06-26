import StylistCard from "@/components/StylistCard";
import Image from "next/image";
import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

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
  maleCutPrice: string;
  femaleCutPrice: string;
}

interface BranchDetails {
  name: string;
  description: string;
  openingTime: string;
  closingTime: string;
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
  const getGoogleMapsEmbedUrl = (location: string) => {
    const formattedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps?q=${formattedLocation}&output=embed`;
  };

  const googleMapsSrc = getGoogleMapsEmbedUrl(location);
  return (
    <div className="flex justify-center items-center flex-col pt-32 px-4">
      <div className="max-w-6xl">
        <div>
          <h1 className="font-bold text-5xl">SEA SALON {name}</h1>
          <p className="text-xl">{description}</p>
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
          <div className="border-b-2 flex justify-center flex-col items-center">
            <div className="text-2xl font-bold">SEA SALON - {name}</div>
            <div className="flex justify-center flex-row mt-4 mb-4">
              <button className="p-3 bg-red rounded-lg flex items-center">
                <MdBookOnline className="mr-2" />
                Book Now
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 px-4">
            <div className="flex flex-row items-center gap-2">
              <div>
                <MdAccessTime className="mr-2" size={24} />
              </div>
              <div>
                {openingTime} - {closingTime}
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
          <div className="text-6xl text-center mb-8 font-bold">Our Stylist</div>
          {stylists.map((stylist) => (
            <StylistCard
              key={stylist.id}
              name={stylist.name}
              imageUrl={stylist.imageUrl}
              maleCutPrice={stylist.maleCutPrice}
              femaleCutPrice={stylist.femaleCutPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchDetailComponent;
