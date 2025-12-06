"use client";
import {
  useEffect,
  useState,
} from 'react';

import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

export default function GlowCursor() {

  const [visible, setVisible] = useState(true);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", show);
    window.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);


const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
  const mobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  setIsMobile(mobile);
}, []);


return (
  <>
    {!isMobile && (
      <>
        {/* Outer Ring */}
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 border rounded-full pointer-events-none mix-blend-screen z-[9999]"
          style={{
            borderColor: "#f5f5f5",
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: visible ? 1 : 0,
          }}
        />

        {/* Inner Dot */}
        <motion.div
          className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none mix-blend-screen z-[9999]"
          style={{
            backgroundColor: "#f5f5f5",
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: visible ? 1 : 0,
          }}
        />
      </>
    )}
  </>
);

}
