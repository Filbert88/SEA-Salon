import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReservationsPage from "@/components/Booking/Reservation";

export default async function ReservationWrapper() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/signin");
  }

  const reservations = await db.reservation.findMany({
    where: { userId: Number(session.user.id) },
    include: {
      branch: true,
      stylist: true,
      services: {
        include: {
          service: true,
        },
      },
    },
  });

  type FormattedReservation = {
    id: number;
    branchName: string;
    date: string;
    time: string;
    stylistName: string;
    totalPrice: string;
    services: string[];
  };

  const formattedReservations: FormattedReservation[] = reservations.map((reservation) => ({
    id: reservation.id,
    branchName: reservation.branch.name,
    date: reservation.date.toISOString(),
    time: reservation.time,
    stylistName: reservation.stylist.name,
    totalPrice: reservation.price.toString(),
    services: reservation.services.map((rs) => rs.service.name),
  }));

  return <ReservationsPage reservations={formattedReservations} />;
}
