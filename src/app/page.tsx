import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import registerUser from "@/actions/home/registerUser";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {

  return (
    <main className="flex  dark:bg-gray-500    flex-col items-center  ">
      <Hero />
      <Features />
    </main>
  );
}
