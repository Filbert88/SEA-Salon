import { db } from "@/lib/db";
import ServiceDetailComponent from "@/components/Service/ServiceDetail";
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ServiceDetailPage({
  params,
}: {
  params: { name: string };
}) {

  const session = await getServerSession(authOptions);

  if(session?.user.role === "ADMIN"){
    redirect("/dashboard");
  }
  const { name } = params;

  const decodedName = decodeURIComponent(name);

  const data = await db.service.findFirst({
    where: { name: decodedName },
    select: {
      name: true,
      description: true,
      imageUrl: true,
      price: true,
    },
  });

  if (!data) {
    notFound();
    return;
  }

  const defaultImageUrl = "/tes.jpg";

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(Number(data.price));

  return (
    <ServiceDetailComponent
      name={data.name}
      imageUrl={data.imageUrl || defaultImageUrl}
      description={data.description}
      price={formattedPrice}
    />
  );
}
