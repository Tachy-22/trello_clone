import { CardBody, CardHeader, Card } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type CardType = {
  url: string;
  text: string;
  header: string;
  types?: string[];
  id: number;
  color: string;
};

const HSCCard = ({ card }: { card: CardType }) => {
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
        <ul className="flex  flex-col gap-3 disc">
          {card.types?.map((type, index) => {
            return (
              <li className="flex gap-1 items-center disc" key={index}>
                {/* <ChevronRight size={12}  /> */}
                <span>{type}</span>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
};

export default HSCCard;
