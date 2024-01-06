"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

const ScrollCarousel = () => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.1], ["70%", "0%"]);

  return (
    <section className=" h-fit z-30   dark:text-foreground">
      <div className="  flex h-fit items-center overflow-hidden max-w-screen w-full  ">
        <motion.div
          style={{ translateX: x }}
          className="md:grid md:grid-cols-3 hidden gap-6 "
        >
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
      <div className="md:hidden gap-6 mx-auto">
        {cards.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType2 }) => {
  return (
    <div key={card.id} className="flex flex-col gap-2 ">
      <Image
        src={card.url}
        className="  transition-transform h-full w-full hover:scale-[98%]   duration-300 "
        height={483}
        width={720}
        alt="illustration"
      />

      <p className="text-lg   rounded-lg p-3 mt-3">
        <p className=" font-semibold text-xl mb-1 ">{card.title}</p>
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
