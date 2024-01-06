import Image from "next/image";
import React from "react";

const Logos = () => {
  return (
    <div className="flex flex-col dark:text-foreground text-black  w-full gap-4 lg:py-[4rem] py-[2rem] px-4 justify-center items-center">
      <p className=" text-center lg:text-start text-xl">
        Join over 2,000,000 teams worldwide that are using Trello to get more
        done.
      </p>
      <Image
        width={500}
        height={20}
        alt="img"
        className="lg:w-[70%] h-full brightness-100 dark:brightness-[350%]"
        src={`/logos-horizontal-visa-coinbase-john-deere-zoom-grand-hyatt-fender.svg`}
      />
    </div>
  );
};

export default Logos;
