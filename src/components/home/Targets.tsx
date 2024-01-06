"use client";
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

import { CardBody, CardHeader, Card } from "@nextui-org/react";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
            return <CardUi card={card} key={card.id} />;
          })}
        </motion.div>
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4 px-2">
          {cards.map((card) => {
            return <CardUi card={card} key={card.id} />;
          })}
        </div>
      </div>
      {/* <div className="  w-full">
        <picture>
          <source
            media="(max-width: 810px)"
            srcSet="/bgImgs/TargetBg_Mobile.jpg"
          />
          <source media="(min-width: 810px)" srcSet="/bgImgs/TargetBg.jpg" />

          <Image
            src="/bgImgs/TargetBg.jpg"
            alt="alt"
            width={4240}
            height={2832}
            className="h-full w-full  rounded-md"
          />
        </picture>
      </div> */}
    </section>
  );
};

const CardUi = ({ card }: { card: CardType }) => {
  return (
    <Card
      key={card.id}
      className="p lg:h-[50vh] md:h-full h-[] min-h-full w-[100vw] sm:w-[60vw] md:w-full lg:w-[30vw]  shadow-lg text-background dark:text-foreground "
    >
      <CardHeader className={` ${card.color} pb-0  px-4 flex-col items-start `}>
        <Image
          src={card.url}
          alt="alt"
          width={200}
          height={200}
          className="translate-y-[50%] lg:h-[4rem] lg:w-[4rem] h-[3rem] w-[3rem] p-2 bg-white dark:bg-neutral-900 rounded-md"
        />
      </CardHeader>
      <CardBody className="flex p-4 py-[2rem] flex-col gap-3">
        <h3 className="font-semibold text-3xl"> {card.header}</h3>
        <p className="">{card.text}</p>
        <ul className="flex flex-col">
          {card.types?.map((type, index) => {
            return (
              <li className="" key={index}>
                {type}
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
};

type CardType = {
  url: string;
  text: string;
  header: string;
  types?: string[];
  id: number;
  color: string;
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
      "Manage any project (big or small) with Trello",
      "Manage all of your projects in one powerful tool that makes project management manageable magical",
      "Custom fields: the only limitation is your imagination",
      "See your projects from any angle",
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
