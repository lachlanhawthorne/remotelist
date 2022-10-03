import * as React from "react";
import { useInView } from "react-intersection-observer";

const sentinelStyle: React.CSSProperties = {
  width: "100%",
  height: 1,
  top:0
};

export function useSticky() {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0
  });

  const sentinel = <div ref={ref} style={sentinelStyle} />;

  return {
    sentinel,
    isSticky: !inView
  };
}
