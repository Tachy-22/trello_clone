"use client";
import { increment } from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="backdrop-blur-2xl px-[2rem] py-[1rem]">DashboardHeader</div>
  );
};

export default DashboardHeader;
