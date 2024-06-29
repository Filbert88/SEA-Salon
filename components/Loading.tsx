import React from "react";

const Loading: React.FC = () => {
  return (
    <main className="flex flex-auto h-screen w-screen justify-center items-center relative z-10">
      <div className="loader"></div>
    </main>
  );
};

export default Loading;
