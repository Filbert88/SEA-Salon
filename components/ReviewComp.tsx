"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Review from "@/components/Review";
import StarRating from "@/components/starRating";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";

export interface Customer {
  fullName: string;
}

export interface Review {
  id: number;
  customer: Customer;
  comment: string;
  starRating: number;
}

interface ReviewCompProps {
  initialReviews: Review[];
}

export default function ReviewComp({initialReviews}:ReviewCompProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(initialReviews);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const submitReview = async () => {
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starRating: userRating,
          comment: reviewText,
          customerId: session?.user.id, 
        }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews(prevReviews => [...prevReviews, newReview])
        setReviewText("");
        setUserRating(0);
        closeModal();
        console.log("masuk");
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
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
              name={review.customer?.fullName || "Anonymous"}
              review={review.comment}
              star={review.starRating}
            />
          </div>
        ))}
      </Slider>
      {session && (
        <div className="flex flex-row justify-center mt-12">
          <button
            onClick={openModal}
            className="border-2 border-custom-green p-3 rounded-lg flex"
          >
            Add review
          </button>
        </div>
      )}
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
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
  );
}
