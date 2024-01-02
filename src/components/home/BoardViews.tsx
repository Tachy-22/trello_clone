"use client";
import useEaseIntoView from "@/controls/useEaseIntoView";
import { useScroll, useTransform, motion } from "framer-motion";
import { BookMarked, ListChecks } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

const BoardViews = () => {
  return (
    <div className=" bg-gradient-to-r lg:max-h-[55rem] lg:mb-[20rem] from-blue-600 via-sky-500 to-sky-400 flex flex-col lg:gap-6 gap-4 w-full justify-start items-center lg:p-[5rem] p-[1rem] py-[2rem]">
      <div className=" text-white flex flex-col gap-3">
        <h3 className=" text-center lg:text-4xl text-2xl capitalize">
          {" "}
          See work in a whole new way
        </h3>
        <p className="text-center lg:text-2xl text-lg lg:w-[80%] mx-auto">
          {" "}
          View your team’s projects from every angle and bring a fresh
          perspective to the task at hand.
        </p>
      </div>
      <View1 />
      <View2 />
    </div>
  );
};

export default BoardViews;

const View1 = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scaleProgress, opacityProgress } = useEaseIntoView(cardRef);

  return (
    <motion.div
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      ref={cardRef}
      className="bg-white shadow-xl mx-auto mt-[3rem] rounded-lg p-6 max-w-7xl lg:flex-row flex-col flex justify-center gap-4"
    >
      <Image
        width={1212}
        height={656}
        alt="img"
        className="w-full h-full"
        src={`/TrelloBoard_Timeline_2x.webp`}
      />
      <div className="flex flex-col w-full px-4 lg:px-[4rem] py-[2rem] gap-[1rem] justify-start">
        <h4 className="font-semibold text-lg uppercase flex gap-2">
          <BookMarked />
          <span className=""> Hit deadlines every time</span>
        </h4>
        <p className="text-xl ">
          {" "}
          From weekly sprints to annual planning, Timeline view keeps all tasks
          on track. Quickly get a glimpse of what’s coming down the pipeline and
          identify any gaps that might impede your team’s progress.
        </p>
      </div>
    </motion.div>
  );
};

const View2 = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scaleProgress, opacityProgress } = useEaseIntoView(cardRef);
  <motion.div
    style={{
      scale: scaleProgress,
      opacity: opacityProgress,
    }}
    ref={cardRef}
    className="bg-white shadow-xl mx-auto mt-[3rem] rounded-lg p-6 max-w-7xl lg:flex-row flex-col-reverse flex justify-center gap-4"
  >
    <div className="flex flex-col w-full p-4 lg:px-[4rem] py-[2rem] gap-[1rem] justify-start">
      <h4 className="font-semibold text-lg uppercase flex gap-2">
        <ListChecks />
        <span className=""> Stay on top of tasks</span>
      </h4>
      <p className="text-xl ">
        Start each day without any surprises. Whether scheduling an editorial
        calendar or staying on top of to-dos, Calendar view is like a crystal
        ball giving you a clear vision of what work lies ahead.
      </p>
    </div>
    <Image
      width={1212}
      height={656}
      alt="img"
      className="w-full h-full"
      src={`/TrelloBoard_Calendar_2x.webp`}
    />
  </motion.div>;
  return (
    <motion.div
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      ref={cardRef}
      className="bg-white shadow-xl mx-auto mt-[3rem] rounded-lg p-6 max-w-7xl lg:flex-row flex-col-reverse flex justify-center gap-4"
    >
      <div className="flex flex-col w-full p-4 lg:px-[4rem] py-[2rem] gap-[1rem] justify-start">
        <h4 className="font-semibold text-lg uppercase flex gap-2">
          <ListChecks />
          <span className=""> Stay on top of tasks</span>
        </h4>
        <p className="text-xl ">
          Start each day without any surprises. Whether scheduling an editorial
          calendar or staying on top of to-dos, Calendar view is like a crystal
          ball giving you a clear vision of what work lies ahead.
        </p>
      </div>
      <Image
        width={1212}
        height={656}
        alt="img"
        className="w-full h-full"
        src={`/TrelloBoard_Calendar_2x.webp`}
      />
    </motion.div>
  );
};
