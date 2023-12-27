import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen  max-w-screen   flex-col items-center  ">
      <Hero />
      <Features />
    </main>
  );
}
