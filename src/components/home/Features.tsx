import ScrollCarousel from "./ScrollCarousel";

const Features = () => {
  return (
    <div className="  text-black py-[4rem] md:py-[4rem] px-[1rem] md:px-[2rem] w-full bg-gradient-to-b from-white via-sky-100 to-sky-200">
      <div className="flex flex-col gap-2 w-full  md:w-[70%] mx-auto">
        <span className="text-2xl md:text-center font-semibold tracking-wide uppercase">
          {" "}
          Trello 101
        </span>
        <h2 className="text-3xl font-bold pb-[1rem] md:text-center">
          {" "}
          A productivity powerhouse
        </h2>
        <p className="text-xl md-w-[60%] md:text-center mx-auto ">
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
