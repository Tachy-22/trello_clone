import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import HSCCard from "./HSCCard";

type CardType = {
  url: string;
  text: string;
  header: string;
  types?: string[];
  id: number;
  color: string;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-84%"]);

  return (
    <section
      ref={targetRef}
      className=" overflow-x-clip max-w-[100vw]  h-[700vh] md:h-full lg:h-[700vh]  "
    >
      <div className="sticky md:relative lg:sticky top-[5vh] md:gap-[4rem] gap-[2rem] flex flex-col justify-end  h-fit py-[3rem] md:py-[0rem] items-start overflow-hidden">
        <div className="flex-col lg:px-[3rem] px-[1rem]   gap-3 h-fit items-start lg:justify-center ">
          <h3 className=" lg:text-xl text-lg uppercase lg:px-[3rem] f">
            Trello In Action
          </h3>
          <p className="lg:text-4xl text-xl lg:px-[3rem]">
            Workflows for any project, big or small
          </p>
        </div>

        <motion.div style={{ x }} className="flex md:hidden  lg:flex gap-4">
          {cards.map((card) => {
            return <HSCCard card={card} key={card.id} />;
          })}
        </motion.div>
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4 px-2">
          {cards.map((card) => {
            return <HSCCard card={card} key={card.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

const cards: CardType[] = [
  {
    header: "Project management",
    text: "Keep tasks in order, deadlines on track, and team members aligned with Trello. From initiation to completion, Trello makes it easy to monitor every aspect of your next project. Designed for teams of any size, anywhere.",

    types: [
      "Manage any project (big or small) with Trello",
      "Manage all of your projects in one powerful tool that makes project management manageable magical",
      "Custom fields: the only limitation is your imagination",
    ],
    id: 1,
    url: "/icon-content-folder_2x.png",
    color: "bg-orange-500",
  },
  {
    header: "Meetings",
    text: "Empower your team meetings to be more productive, empowering, and dare we say—fun.",
    url: "/icon-object-megaphone_2x.png",
    id: 2,
    color: "bg-blue-400",
    types: [
      "Get ready for team time that’s enjoyable and actionable",
      "See a team meeting template in action",
      "Don’t start from scratch",
    ],
  },
  {
    header: "Onboarding",
    text: "Onboarding to a new company or project is a snap with Trello’s visual layout of to-do’s, resources, and progress tracking.",
    url: "/icon-object-leaf_2x.png",
    id: 3,
    color: "bg-green-400",
    types: [
      "Manage any project (big or small) with Trello",
      "Manage all of your projects in one powerful tool that makes project management manageable magical",
      "Custom fields: the only limitation is your imagination",
      "See your projects from any angle",
    ],
  },
  {
    header: "Task management",
    text: "Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.",
    url: "/icon-content-checklists_2x.png",
    id: 4,
    color: "bg-yellow-400",
    types: [
      "Manage any project (big or small) with Trello",
      "Manage all of your projects in one powerful tool that makes project management manageable magical",
      "Custom fields: the only limitation is your imagination",
      "See your projects from any angle",
    ],
  },
  {
    header: "Brainstorming",
    text: "Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.",
    id: 5,
    url: "/UseCasesBrainstorming.svg",
    color: "bg-teal-300",

    types: [
      "Manage any project (big or small) with Trello",
      "Manage all of your projects in one powerful tool that makes project management manageable magical",
      "Custom fields: the only limitation is your imagination",
      "See your projects from any angle",
    ],
  },
  {
    header: "Resource hub",
    text: "Save time with a well-designed hub that helps teams find information easily and quickly.",
    url: "/icon-object-book_2x.png",
    id: 6,
    color: "bg-pink-400",

    types: [
      "Manage any project (big or small) with Trello",
      "Manage all of your projects in one powerful tool that makes project management manageable magical",
      "Custom fields: the only limitation is your imagination",
      "See your projects from any angle",
    ],
  },
];


export default HorizontalScrollCarousel;
