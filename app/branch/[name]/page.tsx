import { db } from "@/lib/db";
import BranchDetailComponent from "@/components/Branch/BranchDetail";
import { notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

function formatPrice(price: number): string {
  return `${Math.round(price / 1000)}K`;
}

export default async function BranchDetailPage({ params }: { params: { name: string } }){
  const session = await getServerSession(authOptions);

  if(session?.user.role === "ADMIN"){
    redirect("/dashboard");
  }
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
          price:true
        }
      }
    },
  });

  if (!data) {
    notFound();
    return ;
  }

  const stylists = data.stylists.map(stylist => ({
    ...stylist,
    price: formatPrice(Number(stylist.price)), 
  }));

  return (
    <BranchDetailComponent
      name={data.name}
      description={data.description}
      openingTime={data.openingTime}
      closingTime={data.closingTime}
      location={data.location}
      phone={data.phone}
      stylists={stylists}
    />
  );
}
