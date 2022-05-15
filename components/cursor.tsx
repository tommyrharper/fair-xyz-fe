import { useState, useEffect } from "react";

const Cursor = () => {
  const [xCoord, setXCoord] = useState<number>(0);
  const [yCoord, setYCoord] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setXCoord(event.pageX);
      setYCoord(event.pageY);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div
      className="absolute -translate-x-2/4 -translate-y-full z-10 mix-blend-difference text-white"
      style={{ top: yCoord, left: xCoord, pointerEvents: "none" }}
    >
      CLICK TO REVEAL
    </div>
  );
};

export default Cursor;
