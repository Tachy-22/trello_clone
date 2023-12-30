import React from "react";
import Nav from "./Nav";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { authorId: string };
}) => {
  return (
    <div className="flex w-full flex-row  min-h-[100vh] h-[100vh] pb-[4rem] dark:bg-gray-900 bg-white  fixed  ">
      <Nav params={params.authorId} />
      <div className="w-full min-h-full h-full overflow-auto scrollVisible">
        {" "}
        {children}
      </div>
    </div>
  );
};

export default layout;
