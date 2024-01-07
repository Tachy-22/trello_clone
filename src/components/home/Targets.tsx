"use client";
import Image from "next/image";
import HorizontalScrollCarousel from "./HorizontalScrollCarousel";

type CardType = {
  url: string;
  text: string;
  header: string;
  types?: string[];
  id: number;
  color: string;
};
const cards2: CardType[] = [
  {
    header: "Integrations",
    text: "Connect the apps your team already uses into your Trello workflow or add a Power-Up to fine-tune your specific needs.",
    id: 1,
    url: "/Integrations_Puzzle.svg",
    color: "bg-green-400/30 ",
  },
  {
    header: "Butler Automation",
    text: "No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.",
    url: "/Gears.svg",
    id: 2,
    color: "bg-blue-400/30 ",
  },
  {
    header: "Trello Enterprise",
    text: "The productivity tool teams love, paired with the features and security needed for scale.",
    url: "/Search_Value.svg",
    id: 3,
    color: "bg-orange-400/30 ",
  },
];

const Targets = () => {
  return (
    <section className="bg-white dark:bg-background text-background dark:text-foreground w-screen">
      <div className="">
        <HorizontalScrollCarousel />
      </div>
      <div className="text-xl  lg:px-[4rem] md:py-[2rem] ">
        <div className="flex flex-col items-center lg:justify-start justify-center h-full">
          <div className="flex flex-col items-start lg:justify-start  max-w-7xl justify-center md:py-[4rem] py-[1rem] lg:py-[1rem]">
            <div className="lg:text-start  p-[1rem] mb-[1rem] ">
              <h2 className="text-lg uppercase">Powerful ways to grow</h2>
              <p className="text-4xl font-bold mb-4">Do more with Trello</p>
              <p className=" text-xl lg:w-[70%]">
                Trello’s intuitive features give any team the ability to quickly
                set up and customize workflows for just about anything.
              </p>
            </div>
            <div className="grid md:grid-cols-3">
              {cards2.map(({ header, color, url, text, id, types }) => (
                <div
                  key={id}
                  className={`flex flex-col items-start justify-start p-6  rounded-lg  shadow-lg m-4 ${color}`}
                >
                  <Image
                    src={url}
                    alt="alt"
                    width={400}
                    height={200}
                    className="  h-[8rem] w-[8rem] rounded-md "
                  />
                  <h3 className="text-2xl font-semibold my-2">{header}</h3>
                  <p className="text-start">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Targets;

