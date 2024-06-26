import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ReviewComp from "@/components/ReviewComp";

export default async function reviewPage() {
  const session = await getServerSession(authOptions);

  const reviews = await db.review.findMany({
    include: {
      customer: {
        select: {
          fullName: true,
        },
      },
    },
  });

  return(
    <ReviewComp initialReviews={reviews}/>
  )
}
