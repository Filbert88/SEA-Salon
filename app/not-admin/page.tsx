import React from "react";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-10">
      <div className= "text-4xl text-white text-center">
        This is admin page
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