"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const ProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      ref={barRef}
      style={{ scaleX: scrollYProgress }}
      className="h-1 w-full bg-blue-500 dark:bg-secondary sticky origin-top-left top-[4rem] left-0 "
    />
  );
};

export default ProgressBar;
