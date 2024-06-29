"use client";
import React from "react";

const Footer: React.FC = () => {
  const handleSmoothClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    e.preventDefault();
    if (url === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(url);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="flex justify-center bg-black">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-custom-green">
            <a
              onClick={(e) => handleSmoothClick(e, "/")}
              className="leading-normal min-w-40 cursor-pointer"
            >
              Home
            </a>
            <a
              onClick={(e) => handleSmoothClick(e, "#service")}
              className="leading-normal min-w-40 cursor-pointer"
            >
              Services
            </a>
            <a
              onClick={(e) => handleSmoothClick(e, "#review")}
              className="leading-normal min-w-40 cursor-pointer"
            >
              Reviews
            </a>
            <a
              onClick={(e) => handleSmoothClick(e, "#contact")}
              className="leading-normal min-w-40 cursor-pointer"
            >
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
