"use client";
import { useState } from 'react';

import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';

export default function CursorTrail() {
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - bounds.left);
    mouseY.set(e.clientY - bounds.top);
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      onMouseMove={handleMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <motion.div
          className="w-3 h-3 rounded-full bg-white opacity-70"
          style={{
            position: "absolute",
            left: smoothX,
            top: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            boxShadow: "0 0 12px rgba(255,255,255,0.7)",
          }}
          transition={{ duration: 0.1 }}
        />
      )}
    </div>
  );
}
