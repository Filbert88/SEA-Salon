import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon from react-icons
import Link from "next/link"; // Importing Link from next/link

interface cardProps {
  title: string;
  phoneNumber: string;
}

const ContactCard = ({ title, phoneNumber }: cardProps) => {
  return (
    <div className="cursor-pointer relative">
      <div className="flex flex-col items-center">
        <div className="w-[250px] relative">
          <Image
            className="aspect-[2/3] w-full rounded-xl"
            src="/tes.jpg"
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
        <div className="flex items-center justify-center mt-2">
          <div className="flex flex-row gap-4">
            <div>Contact me</div>
            <Link
              href={`https://wa.me/${phoneNumber}`}
              className="text-green-500 text-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
