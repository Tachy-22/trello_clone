import { useScroll, useTransform } from "framer-motion";
import React from "react";

const useEaseIntoView = (cardRef: React.RefObject<HTMLDivElement>) => {
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return {
    scaleProgress,
    opacityProgress,
  };
};

export default useEaseIntoView;
