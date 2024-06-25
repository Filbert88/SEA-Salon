import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="#">Home</a>
            <a className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="#">Services</a>
            <a className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="#">Gallery</a>
            <a className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="#">About Us</a>
            <a className="text-[#4e7397] text-base font-normal leading-normal min-w-40" href="#">Contact</a>
          </div>
          <p className="text-[#4e7397] text-base font-normal leading-normal">@2023 SEA Salon</p>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
