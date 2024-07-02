import React from "react";
import ContactCard from "./ContactCard";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center mt-32 gap-6" id="contact">
      <h1 className="text-5xl font-bold text-center text-white">Our Contacts</h1>
      <div className="flex flex-col md:flex-row gap-10 md:gap-40">
        <ContactCard title="Thomas" phoneNumber="08123456789" imageUrl="/Thomas.jpg"/>
        <ContactCard title="Sekar" phoneNumber="08164829372" imageUrl="/Sekar.jpg" />
      </div>
    </div>
  );
}
