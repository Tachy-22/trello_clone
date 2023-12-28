import React from "react";
import DashboardHeader from "./DashboardHeader";

const DashBoardLayout = (props: {
  children: React.ReactNode;
  nav: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col   h-full ">
      <div className="flex overflow-x-auto  my-auto h-full fixed w-full">
        {props.nav}
        <div className="flex flex-col">
          <DashboardHeader />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
