import React from "react";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className= "text-2xl">
        This is a admin page
      </div>
      <div className="mt-6 text-xl">
        <a href="/" className="text-white hover:underline text-xl">
          Go back
          <span className="font-bold text-red text-xl"> home</span>
        </a>
      </div>
    </div>
  );
}