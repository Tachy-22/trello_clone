import ScrollCarousel from "./ScrollCarousel";

const Features = () => {
  return (
    <div className="  text-black dark:text-foreground py-[3rem] lg:py-[2rem] px-[1rem] lg:px-[2rem] w-full bg-gradient-to-b from-white via-sky-100 to-sky-200 dark:from-[#999999]  dark:to-background flex flex-col gap-[3rem]">
      <div className="flex flex-col gap-2 w-full  lg:w-[80%] mx-auto">
        <span className="text-2xl  font-semibold tracking-wide uppercase">
          {" "}
          Trello 101
        </span>
        <h2 className="text-3xl font-bold pb-[1rem]  ">
          {" "}
          A productivity powerhouse
        </h2>
        <p className="text-xl lg:w-[60%]    ">
          Simple, flexible, and powerful. All it takes are boards, lists, and
          cards to get a clear view of who’s doing what and what needs to get
          done. Learn more in our guide for getting started.
        </p>
      </div>
      <div className=" flex max-w-screen w-full overflow-hidden ">
        <ScrollCarousel />
      </div>
    </div>
  );
};

export default Features;
