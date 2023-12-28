import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full ">
      <div className="flex items-center gap-2 px-2 py-2">
        <Link className="" href="/">
          <div className="bg-gradient-to-br from-green-900 via-green-700 to-green-300 text-white p-4 w-10 h-10 rounded-md flex justify-center items-center font-extrabold">
            T
          </div>
        </Link>
        <div className=" flex flex-col">
          <span className="">
            <Link className="" href="/">
              <p className="font-semibold">Trello Workspace</p>
            </Link>
          </span>
          <p className="xA6qXDYKXT21gE">Free</p>
        </div>
      </div>
    </div>
  );
};

export default page;
