import React, { useState } from "react";
import { ToastState } from "../Toast";

interface Customer {
  fullName: string;
  email: string;
}

interface Review {
  id: number;
  starRating: number;
  comment: string;
  createdAt: Date;
  customer: Customer;
}

interface DeleteReviewProps {
  reviews: Review[];
  setLoading: (isLoading: boolean) => void;
  setToast: (toast: ToastState) => void;
}

const DeleteReview: React.FC<DeleteReviewProps> = ({
  reviews,
  setLoading,
  setToast,
}) => {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);

  const handleDelete = async (reviewToDelete: Review) => {
    setLoading(true);

    const updatedReviews = reviewList.filter(
      (review) => review.id !== reviewToDelete.id
    );
    console.log("Before updating:", reviewList);
    setReviewList(updatedReviews);
    console.log("After updating:", updatedReviews);
    try {
      const response = await fetch("/api/admin/delete/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId: reviewToDelete.id }),
      });

      if (response.ok) {
        setToast({
          isOpen: true,
          message: "Review deleted successfully",
          type: "success",
        });
        console.log("Review deleted successfully");
      }
    } catch (error) {
      setReviewList(reviews);
      setToast({
        isOpen: true,
        message: "Error deleting review",
        type: "error",
      });
      console.error("Error deleting reservation:", error);
    } finally {
      setLoading(false);
      setReviewList(
        reviewList.filter((review) => review.id !== reviewToDelete.id)
      );
    }
  };

  return (
    <div className="mt-8">
      <div className="text-center text-3xl font-bold">All Reviews</div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewList.map((review, index) => (
            <div key={review.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold text-black">
                  {review.customer.fullName}
                </h5>
                <button
                  onClick={() => handleDelete(review)}
                  className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {review.customer.email}
              </p>
              <p className="text-gray-800">
                <span className="font-medium">Comment:</span> {review.comment}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <span className="text-yellow-400 font-medium">{`${review.starRating}/5 stars`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteReview;
