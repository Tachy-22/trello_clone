"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const ScrollCarousel = () => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.1], ["70%", "0%"]);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section className=" h-fit z-30   dark:text-foreground">
      <div className="  flex h-fit items-center overflow-hidden max-w-screen w-full  ">
        <motion.div
          // style={{ translateX: x }}
          className="grid md:grid-cols-3  gap-6 "
        >
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType2 }) => {
  return (
    <div className="flex flex-col gap-2 ">
      <Image
        src={card.url}
        className="  transition-transform h-full w-full hover:scale-[98%]   duration-300 "
        height={483}
        width={720}
        alt="illustration"
      />

      <p className="md:text-sm text-lg lg:text-lg text-base   rounded-lg p-3 mt-3">
        <p className=" lg:font-semibold font-bold md:text-xl text-lg mb-1 ">
          {card.title}
        </p>
        {card.content}
      </p>
    </div>
  );
};

export default ScrollCarousel;

const cards: CardType2[] = [
  {
    url: "/CarouselBoards.webp",
    title: "Boards",
    content:
      "Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!",
    id: 1,
  },
  {
    url: "/CarouselCards.webp",
    title: "Cards",
    content:
      "The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. ",
    id: 2,
  },
  {
    url: "/CarouselLists.webp",
    title: "Lists",
    content:
      "Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists.",
    id: 3,
  },
];
