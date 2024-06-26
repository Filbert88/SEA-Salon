import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import ServicePage from "@/components/Service";

export default async function ServiceWrapper() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const services = await db.service.findMany({
    select: {
      name: true,
      id: true,
      imageUrl:true,
    },
  });

  const uniqueServices = Array.from(new Map(services.map(service => [service.name, service])).values());

  return (
    <ServicePage services={uniqueServices}/>
  )
}
