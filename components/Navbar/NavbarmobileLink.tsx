import React, { useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";

interface NavLink {
  link: string;
  path: string;
}

interface NavbarmobileLinkProps {
  links: NavLink[];
  handleLinkClick: (path: string) => void;
  session: any;
  signOut: (e: React.MouseEvent<HTMLButtonElement>) => void; 
}

const NavbarmobileLink = ({
  links,
  handleLinkClick,
  session,
  signOut,
}: NavbarmobileLinkProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <ul className="flex flex-col gap-4 py-2 mb-2 items-center animate-slidetopbot z-30">
      {links.map((link, index) => (
        <li key={index} className="z-30 text-custom-green">
          <NavbarLink
            navlink={link.path}
            value={link.link}
          />
        </li>
      ))}
      <li className="z-30">
        {session ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut(e);
            }}
            className={`z-30 mb-4 mt-1 font-spacemono border-2 border-[#64ffda] text-[#64ffda] text-[14px] rounded-lg px-4 py-2 ${
              isMobile
                ? ""
                : "hover:scale-110 transition-all duration-300 hover:shadow-[3px_3px_0px_0px_#64ffda]"
            }`}
          >
            Sign Out
          </button>
        ) : (
          <a
            href="/signin"
            className={`z-30 mb-4 mt-1 font-spacemono border-2 border-[#64ffda] text-[#64ffda] text-[14px] rounded-lg px-4 py-2 ${
              isMobile
                ? ""
                : "hover:scale-110 transition-all duration-300 hover:shadow-[3px_3px_0px_0px_#64ffda]"
            }`}
          >
            Sign In
          </a>
        )}
      </li>
    </ul>
  );
};

export default NavbarmobileLink;
