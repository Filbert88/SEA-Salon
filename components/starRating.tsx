import React, { useState } from 'react';

interface StarRatingProps {
  onRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onRating }) => {
  const [rating, setRating] = useState<number>(0);

  const handleSetRating = (index: number) => {
    setRating(index);
    onRating(index); 
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleSetRating(index + 1)}
          className={`text-3xl cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRating;
