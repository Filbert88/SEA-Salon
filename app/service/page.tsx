import { db } from "@/lib/db";
import ServicePage from "@/components/Service/Service";

export default async function ServiceWrapper() {
  const services = await db.service.findMany({
    select: {
      name: true,
      id: true,
      imageUrl: true,
    },
  });

  const uniqueServices = Array.from(
    new Map(services.map((service) => [service.name, service])).values()
  );

  return <ServicePage services={uniqueServices} />;
}
