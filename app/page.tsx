import Image from "next/image";
import HomePage from "./home/page";
import MainService from "@/components/MainService";
import MainServiceWrapper from "./main-service/page";
import ReviewPage from "./review/page";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-10 pt-32 md:px-24 md:py-24">
      <HomePage />
      <MainServiceWrapper />
      <ReviewPage />
      <Contact />
    </main>
  );
}
