import React from "react";
import BranchCard from "@/components/BranchCard";

const branchData = [
  {
    branchName: "Pondok Indah Mall",
    branchLocation: "Jl. Metro Pondok Indah No.123A, RT.11/RW.16, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310",
    href: "/Pondok Indah Mall"
  },
  {
    branchName: "Central Park Mall",
    branchLocation: "Jl. Letjen S. Parman No.28, RT.3/RW.5, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470",
    href: "/Pondok Indah Mall"
  },
  {
    branchName: "Kota Kasablanka",
    branchLocation: "Jl. Casablanca Raya Kav. 88, Menteng Dalam, Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12870",
    href: "/Pondok Indah Mall"
  },
  {
    branchName: "Kota Kasablanka",
    branchLocation: "Jl. Casablanca Raya Kav. 88, Menteng Dalam, Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12870",
    href: "/Pondok Indah Mall"
  },
  {
    branchName: "Kota Kasablanka",
    branchLocation: "Jl. Casablanca Raya Kav. 88, Menteng Dalam, Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12870",
    href: "/Pondok Indah Mall"
  },
  {
    branchName: "Kota Kasablanka",
    branchLocation: "Jl. Casablanca Raya Kav. 88, Menteng Dalam, Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12870",
    href: "/Pondok Indah Mall"
  }
];

export default function BranchPage() {
  return (
    <div className="px-4 sm:px-40 pt-32 flex flex-col justify-center items-center min-h-[700px] mb-8">
      <div className="text-7xl">Our Branches</div>
      <div className="mt-6 text-xl">Welcome to our Branch Section! At SEA-SALON, we have established various branches to cater to the diverse needs of our valued customers. Our branches are staffed with skilled professionals who are passionate about delivering top-notch solutions and exceeding customer expectations.</div>
      {branchData.map((branch, index) => (
        <BranchCard key={index} branchName={branch.branchName} branchLocation={branch.branchLocation} href={branch.href}/>
      ))}
    </div>
  );
}
