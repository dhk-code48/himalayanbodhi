import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface LogoProps extends React.ComponentProps<typeof motion.div> {}

const Logo: FC<LogoProps> = ({ className, ...props }) => {
  return (
    <AnimatePresence>
      <motion.div
        exit={{
          y: -20,
          opacity: 0,
          filter: "blur(5px)",
          transition: { ease: "easeIn", duration: 0.7 },
        }}
        initial={{ opacity: 0, y: -15 }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { type: "spring", duration: 0.7 },
        }}
        className={cn("text-xl font-bold text-primary", className)}
        {...props}
      >
        <h1>Himalayan Bodhi</h1>
      </motion.div>
    </AnimatePresence>
  );
};

export default Logo;
