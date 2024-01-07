import Image from "next/image";

const FeatureCard = ({ card }: { card: CardType2 }) => {
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
        <span className=" lg:font-semibold font-bold md:text-xl text-lg mb-1 ">
          {card.title}
        </span>
        {card.content}
      </p>
    </div>
  );
};

export default FeatureCard;
