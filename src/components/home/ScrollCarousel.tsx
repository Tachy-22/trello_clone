"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const ScrollCarousel = () => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.1], ["70%", "0%"]);

  return (
    <section className=" h-fit z-30  ">
      <div className="  flex h-fit items-center overflow-hidden max-w-screen w-full text-white ">
        <motion.div
          style={{ translateX: x }}
          className="lg:grid lg:grid-cols-3 hidden gap-4 "
        >
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
      <motion.div className="lg:hidden gap-4 mx-auto">
        {cards.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </motion.div>
    </section>
  );
};

const Card = ({ card }: { card: CardType2 }) => {
  return (
    <div
      key={card.id}
      className="flex flex-col gap-2 text-black dark:text-white"
    >
      <p className=" font-semibold text-lg ">{card.title}</p>
      <Image
        src={card.url}
        className="  transition-transform h-full w-full  duration-300 "
        height={483}
        width={720}
        alt="illustration"
      />
      <p className="text-md  bg-white/40 dark:bg-gray-900 rounded-lg p-3 mt-4">
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
      "The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.",
    id: 2,
  },
  {
    url: "/CarouselLists.webp",
    title: "Lists",
    content:
      "Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.",
    id: 3,
  },
];
