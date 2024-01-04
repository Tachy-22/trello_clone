import React from "react";

const getBackground = (board: BoardDataType) => {
  const color1 = board?.backgroundColor.split("-")[0];
  const color2 = board?.backgroundColor.split("-")[1];

  const background =
    board?.backgroundColor !== ""
      ? `linear-gradient(to  right,  ${color1} 0%,${color2} 100%)`
      : `url(${board?.backgroundImage})`;
  return background;
};

export default getBackground;
