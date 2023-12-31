import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Targets from "@/components/home/Targets";
import BoardViews from "@/components/home/BoardViews";
import Logos from "@/components/home/Logos";
import Footer from "@/components/home/Footer";

export default async function Home() {
  return (
    <main className="flex      flex-col items-center max-w-screen  overflow-x-clip">
      <Hero />
      <Features />
      <Targets />
      <BoardViews />
      <Logos />
      <Footer />
    </main>
  );
}
