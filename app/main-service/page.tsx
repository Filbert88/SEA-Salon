import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import MainServicePage from "@/components/Service/MainServicePage";

export default async function MainServiceWrapper() {
  const services = await db.service.findMany({
    select: {
      name: true,
      id: true,
      imageUrl: true,
      description: true,
    },
  });

  const uniqueServices = Array.from(
    new Map(services.map((service) => [service.name, service])).values()
  );

  return <MainServicePage services={uniqueServices} />;
}
