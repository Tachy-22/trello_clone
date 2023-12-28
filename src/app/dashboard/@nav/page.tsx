import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-w-full flex  ">
      <div className="flex items-center gap-2 pr-[2rem] py-2">
        <Link className="" href="/">
          <div className="bg-gradient-to-br from-green-900 via-green-700 to-green-300 text-white p-4 w-10 h-10 rounded-md flex justify-center items-center font-extrabold">
            T
          </div>
        </Link>
        <div className=" flex flex-col min-w-full pr-4">
          <Link className="w-full font-semibold" href="/">
            Trello Workspace
          </Link>

          <p className="xA6qXDYKXT21gE">Free</p>
        </div>
      </div>
    </div>
  );
};

export default page;
