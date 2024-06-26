import StylistCard from "@/components/StylistCard";
import Image from "next/image";
import React from "react";
import {
  MdBookOnline,
  MdAccessTime,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";

export default function Page() {
  const googleMapsSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9022189056755!2d106.78829961529234!3d-6.265451295470477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f150bcafbd97%3A0x20db7d7610e1f78f!2sPondok%20Indah%20Mall!5e0!3m2!1sen!2sid!4v1653509982378!5m2!1sen!2sid";

  return (
    <div className="flex justify-center items-center flex-col pt-32 px-4">
      <div className="max-w-6xl">
        <div>
          <h1 className="font-bold text-5xl">SEA SALON Pondok Indah Mall</h1>
          <p className="text-xl">
            SEA SALON Pondok Indah Mall has been completed with the Hijab area
            and Kerastase Institute. Our salon concept design is Future
            Contemporer, combining nature and industrial elements. We have
            numerous selfie corners where you can capture a selfie after getting
            your hair done!
          </p>
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
            <div className="text-2xl font-bold">
              Irwan Team HairDesign - Pondok Indah Mall
            </div>
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
              <div>09.00 - 22.00</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div>
                <MdPhone className="mr-2" size={24} />
              </div>
              <div>081232392323</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div>
                <MdLocationOn className="mr-2" size={24} />
              </div>
              <div>
                Jl. Metro Pondok Indah No.123A, RT.11/RW.16, Pd. Pinang, Kec.
                Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                12310
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-16">
          <StylistCard />
        </div>
      </div>
    </div>
  );
}
