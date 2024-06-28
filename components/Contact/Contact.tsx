import React from "react";
import ContactCard from "./ContactCard";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-6">
      <h1 className="text-5xl font-bold text-center text-white">Our Contacts</h1>
      <div className="flex flex-col md:flex-row gap-10 md:gap-40">
        <ContactCard title="Thomas" phoneNumber="08123456789" />
        <ContactCard title="Sekar" phoneNumber="08164829372" />
      </div>
    </div>
  );
}
