import React from "react";
import BoardAuthSecurityProvider from "./BoardAuthSecurityProvider";

const DashBoardMainLayout = ({ children }: { children: React.ReactNode }) => {
  return <BoardAuthSecurityProvider>{children}</BoardAuthSecurityProvider>;
};

export default DashBoardMainLayout;
