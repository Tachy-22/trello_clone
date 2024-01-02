import Image from "next/image";
import React from "react";
import EmailSignUp from "../ui/EmailSignUp";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r text-white via-purple-500 from-cyan-950 to-pink-400 w-full flex flex-col">
      <section className="flex flex-col lg:flex-row overflow-hidden items-center lg:items-start  justify-center gap-2  lg:pt-[8rem] pt-[4rem] -mb-[10rem]  w-full ">
        <div className="flex flex-col w-fit lg:gap-3 gap-4  lg:px-4 px-2  py-6">
          <h1 className=" text-3xl lg:text-5xl text-center lg:text-start font-semibold   lg:flex lg:flex-col gap-3 block">
            <span className="">Drello brings all your</span>{" "}
            <span>tasks, teammates, and</span>{" "}
            <span className="">tools together</span>
          </h1>
          <p className="font-semibold py-3 text-center lg:text-start text-sm lg:text-base">
            Keep everything in the same place—even if your team isn’t.
          </p>
          <EmailSignUp />
        </div>

        <Image
          src={`/TrelloUICollage_4x.webp`}
          alt="hero illustration"
          className="lg:w-[633px] lg:h-[558px] z-30 sm:w-[508px] sm:h-[447px] w-[401px] h-[353px]  "
          width={1140}
          height={1006}
        />
      </section>

      <Image
        width={2000}
        height={2000}
        src="/white-wave-bg.svg"
        alt="svg"
        className=" "
      />
    </div>
  );
};

export default Hero;
