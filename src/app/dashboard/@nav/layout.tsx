import React from "react";
import ToggleProvider from "./ToggleProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <ToggleProvider>{children}</ToggleProvider>;
};

export default layout;
