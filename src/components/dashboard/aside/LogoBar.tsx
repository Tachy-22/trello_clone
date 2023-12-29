import Link from "next/link";

const LogoBar = () => {
  return (
    <div className="flex w-full items-center gap-2  pl-4 pr-[3rem] py-2 ">
      <Link className="" href="/">
        <div className="bg-gradient-to-br from-green-900 via-green-700 to-green-300 text-white p-4 w-10 h-10 rounded-md flex justify-center items-center font-extrabold">
          T
        </div>
      </Link>
      <div className=" flex flex-col min-w-fit w-fit ">
        <Link className="w-full font-semibold" href="/">
          Trello Workspace
        </Link>

        <p className="">Free</p>
      </div>
    </div>
  );
};

export default LogoBar;
