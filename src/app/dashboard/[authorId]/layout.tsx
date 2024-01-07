import React from "react";
import Nav from "./Nav";
import BoardAuthSecurityProvider from "../BoardAuthSecurityProvider";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { authorId: string };
}) => {
  console.log("id:", params.authorId);

  return (
    <div className="flex w-full flex-row  min-h-[100vh] h-[100vh] pb-[4rem]   fixed  ">
      <Nav params={params.authorId} />
      <div className="w-full min-h-full h-full overflow-auto scrollVisible">
        {" "}
        {children}
      </div>
    </div>
  );
};

export default layout;
