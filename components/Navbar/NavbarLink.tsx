import React from "react";

interface NavbarLinkProps {
  navlink: string;
  value: string;
}

const NavbarLink = ({ navlink, value }: NavbarLinkProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (navlink.startsWith("#")) {
      event.preventDefault();

      if (window.location.pathname === "/") {
        window.location.hash = navlink;
      } else {
        window.location.href = `${window.location.origin}/${navlink}`;
      }
    }
  };

  return (
    <a href={navlink} onClick={handleClick} className="text-2xl">
      {value}
    </a>
  );
};

export default NavbarLink;