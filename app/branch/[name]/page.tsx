import { db } from "@/lib/db";
import BranchDetailComponent from "@/components/Branch/BranchDetail";

function formatTime(timeString:Date) {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatPrice(price: number): string {
  return `${Math.round(price / 1000)}K`;
}


export default async function BranchDetailPage({ params }: { params: { name: string } }){
  const { name } = params;

  const decodedName = decodeURIComponent(name);
  const data = await db.branch.findFirst({
    where: { name:decodedName },
    select: {
      name: true,
      description: true,
      openingTime: true,
      closingTime: true,
      location: true,
      phone: true,
      stylists: {  
        select: {
          id: true,
          name: true,
          imageUrl: true,
          maleCutPrice: true,
          femaleCutPrice: true,
        }
      }
    },
  });

  if (!data) {
    return <p>Branch not found</p>;
  }

  const formattedOpeningTime = formatTime(data.openingTime);
  const formattedClosingTime = formatTime(data.closingTime);

  const stylists = data.stylists.map(stylist => ({
    ...stylist,
    maleCutPrice: formatPrice(stylist.maleCutPrice),
    femaleCutPrice: formatPrice(stylist.femaleCutPrice),
  }));

  return (
    <BranchDetailComponent
      name={data.name}
      description={data.description}
      openingTime={formattedOpeningTime}
      closingTime={formattedClosingTime}
      location={data.location}
      phone={data.phone}
      stylists={stylists}
    />
  );
}
