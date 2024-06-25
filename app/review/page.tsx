"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import Review from "@/components/Review";
import StarRating from "@/components/starRating";
import Modal from "@/components/Modal";
export const reviews = [
  {
    id: 1,
    name: "John Doe",
    review: "Fantastic service! Highly recommend.",
    star: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "Good service but took a bit longer than expected.",
    star: 3,
  },
  {
    id: 3,
    name: "Emily Johnson",
    review: "Perfect experience, loved every moment!",
    star: 5,
  },
  {
    id: 4,
    name: "Chris Lee",
    review: "Not bad, but the service could be improved.",
    star: 2,
  },
  {
    id: 5,
    name: "Patricia Brown",
    review: "Amazing staff and top-notch services offered!",
    star: 5,
  },
];

export default function Reviews() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const submitReview = () => {
    console.log("Submitted Rating:", userRating);
    console.log("Review:", reviewText);
    closeModal();
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <div className="text-5xl mb-16 font-bold text-center">What They Said</div>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index}>
            <Review
              name={review.name}
              review={review.review}
              star={review.star}
            />
          </div>
        ))}
      </Slider>
      <div className="flex flex-row justify-center mt-12">
        <button
          onClick={openModal}
          className="border-2 border-custom-green p-3 rounded-lg flex"
        >
          Add review
        </button>
      </div>

      <div className="flex justify-center items-center flex-row">
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
        >
          <h2 className="text-xl font-bold mb-4">Add Your Review</h2>
          <StarRating onRating={setUserRating} />
          <textarea
            className="border text-black rounded border-gray-300 p-2 w-full mt-4"
            rows={4}
            placeholder="Your review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            onClick={submitReview}
            className="mt-4 bg-gray-300 text-black p-3 rounded-lg"
          >
            Submit Review
          </button>
        </Modal>
      </div>
    </div>
  );
}
