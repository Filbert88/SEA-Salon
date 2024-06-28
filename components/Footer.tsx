import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center bg-black">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-custom-green">
            <a className=" leading-normal min-w-40" href="#">
              Home
            </a>
            <a className="leading-normal min-w-40" href="#">
              Services
            </a>
            <a className="leading-normal min-w-40" href="#">
              About Us
            </a>
            <a className="leading-normal min-w-40" href="#">
              Contact
            </a>
          </div>
          <p className="text-custom-green leading-normal">@2024 SEA Salon</p>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
