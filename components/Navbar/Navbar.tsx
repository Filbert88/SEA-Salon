"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavbarLink from "./NavbarLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavbarmobileLink from "./NavbarmobileLink";
import { signIn, signOut, useSession } from "next-auth/react";

const navLinkarr = [
  {
    link: "Home",
    path: "/",
  },
  {
    link: "Service",
    path: "/service",
  },
  {
    link: "Branch",
    path: "/branch",
  },
  {
    link: "My Reservation",
    path: "/reservation",
  },
];



const Navbar = () => {
  const { data: session, status } = useSession();
  const [openNavbar, setOpenNavbar] = useState(false);
  const [navbarBg, setNavbarBg] = useState("bg-transparent");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      const scrolledColor = isMobile
        ? "bg-[#141414]"
        : isScrolled
        ? "bg-[#141414]"
        : "bg-transparent";

      setNavbarBg(scrolledColor);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [openNavbar, isMobile]);

  const handleMobileLinkClick = (path: string) => {
    setOpenNavbar(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/" && window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  const handleNavLinkClick = () => {
    setOpenNavbar(false);
  };

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    await signOut({
      redirect: false, 
      callbackUrl: '/' 
    });
    
    window.location.href = '/';
  };
  

  const authButton =
    status === "loading" ? (
      <div className="font-spacemono ml-2 lg:ml-4 border-2 border-[#64ffda] text-[#64ffda] lg:text-[17px] rounded-lg px-5 py-3">
        Sign Out
      </div>
    ) : session ? (
      <button
        onClick={handleSignOut}
        className="font-spacemono ml-2 lg:ml-4 border-2 border-[#64ffda] text-[#64ffda] lg:text-[17px] rounded-lg px-5 py-3 hover:scale-110 transition-all duration-300 hover:shadow-[3px_3px_0px_0px_#64ffda]"
      >
        Sign Out
      </button>
    ) : (
      <Link
        href="/signin"
        className="font-spacemono ml-2 lg:ml-4 border-2 border-[#64ffda] text-[#64ffda] lg:text-[17px] rounded-lg px-5 py-3 hover:scale-110 transition-all duration-300 hover:shadow-[3px_3px_0px_0px_#64ffda]"
      >
        Sign In
      </Link>
    );

  return (
    <nav
      id="navbar"
      className={`fixed top-0 right-0 left-0 z-20 ${navbarBg} bg-opacity-95`}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto py-6 px-4 custom:px-6 sm:px-16 md:px-8 z-10">
        <Link
          href="/"
          className="text-xl custom:text-2xl md:text-3xl lg:text-4xl text-[#64ffda] font-bold hover:scale-110 focus:scale-110 duration-300 transition ease-in-out delay-50 z-10"
          onClick={handleHomeClick}
        >
          SEA-SALON
        </Link>
        <div className="mobile-menu block md:hidden z-10">
          {openNavbar ? (
            <button
              onClick={() => setOpenNavbar(false)}
              className="flex items-center px-3 py-2 border rounded border-[#64ffda] text-[#64ffda]"
            >
              <XMarkIcon className="custom:h-5 custom:w-5 h-3 w-3" />
            </button>
          ) : (
            <button
              onClick={() => setOpenNavbar(true)}
              className="flex items-center px-3 py-2 border rounded border-[#64ffda] text-[#64ffda]"
            >
              <Bars3Icon className="custom:h-5 custom:w-5 h-3 w-3" />
            </button>
          )}
        </div>

        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-2 md:p-0 md:flex-row md:space-x-4 mt-0 items-center">
            {navLinkarr.map((link, index) => (
              <li key={index}>
                <NavbarLink navlink={link.path} value={link.link} />
              </li>
            ))}
            <li>{authButton}</li>
          </ul>
        </div>
      </div>
      {openNavbar && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-80 z-1"
          onClick={() => setOpenNavbar(false)}
        ></div>
      )}
      {openNavbar ? (
        <NavbarmobileLink
          links={navLinkarr}
          handleLinkClick={handleMobileLinkClick}
          session={session}
          signOut={handleSignOut}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
