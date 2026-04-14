import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!finePointer) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[95] mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.35)]" />
    </motion.div>
  );
}
