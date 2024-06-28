import { db } from "@/lib/db";
import BookingPage from "@/components/Booking/booking";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

function convertToLocalTimeString(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default async function BookingWrapper() {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/signin");
  }
  const branches = await db.branch.findMany({
    select: {
      name: true,
      openingTime: true,
      closingTime: true,
      location:true,
      phone:true,
    },
  });

  const processedBranches = branches.map(branch => ({
    name: branch.name,
    openingTime: convertToLocalTimeString(branch.openingTime),
    closingTime: convertToLocalTimeString(branch.closingTime),
    location: branch.location,
    phone: branch.phone
  }));

  return <BookingPage branches={processedBranches} />;
}
