import React from "react";
import SignUp from "@/components/SignUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const SingUpPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  return (
    <main className="flex flex-auto items-center justify-center bg-black min-h-screen overflow-hidden">
      <SignUp />
    </main>
  );
};

export default SingUpPage;
