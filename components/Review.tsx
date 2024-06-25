import React from "react";

interface ReviewProps {
  name: string;
  review: string;
  star: number;
}

export default function Review({ name, review, star }: ReviewProps) {
  const renderStars = () => {
    return Array.from({ length: star }, (_, index) => (
      <span key={index}>★</span>
    ));
  };
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2">
      <p className="italic">"{review}"</p>
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-yellow-500 text-xl">{renderStars()}</div>
    </div>
  );
}
