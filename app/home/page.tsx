import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HomePage from "@/components/HomePage";

export default async function HomeWrapper(){
  const session = await getServerSession(authOptions);
  if(session?.user.role === "ADMIN"){
    redirect("/dashboard");
  }

  return <HomePage />
}