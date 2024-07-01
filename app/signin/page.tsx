import Signin from "@/components/SignInForm";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  return (
    <main className="flex flex-auto items-center justify-center bg-black min-h-screen overflow-hidden px-5 sm:px-0 w-full">
      <Signin />
    </main>
  );
};

export default SignInPage;
