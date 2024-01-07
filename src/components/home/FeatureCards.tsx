import FeatureCard from "./FeatureCard";

const FeatureCards = () => {
  return (
    <section className=" h-fit    dark:text-foreground">
      <div className="  flex h-fit items-center overflow-hidden max-w-screen w-full  ">
        <div className="grid md:grid-cols-3  gap-6 ">
          {cards.map((card) => {
            return <FeatureCard card={card} key={card.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

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

export default FeatureCards;

