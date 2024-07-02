import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ServicePage from "@/components/Service/Service";

export default async function ServiceWrapper() {
  const session = await getServerSession(authOptions);

  if(session?.user.role === "ADMIN"){
    redirect("/dashboard");
  }
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
