import React, { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  large?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

export default function MaxWidthWrapper({
  style,
  className,
  children,
  large = false,
}: props) {
  return (
    <div
      className={cn(
        "container",
        large ? "max-w-screen-2xl" : "max-w-6xl",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
