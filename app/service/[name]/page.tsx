import { db } from "@/lib/db";
import ServiceDetailComponent from "@/components/ServiceDetail";

export default async function ServiceDetailPage({
  params,
}: {
  params: { name: string };
}) {
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
    return <p>Service not found</p>;
  }

  const defaultImageUrl = "/tes.jpg"; 

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
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