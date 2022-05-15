import { useState, useEffect } from "react";

const Cursor = () => {
  const [xCoord, setXCoord] = useState<number>(0);
  const [yCoord, setYCoord] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { pageX, pageY } = event;
      if (pageX !== 0) setXCoord(event.pageX);
      if (pageY !== 0) setYCoord(event.pageY);
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  });

  // console.log(xCoord, yCoord);

  return (
    <div
      className="absolute -translate-x-2/4 -translate-y-full z-10"
      // className="absolute z-10"
      style={{ top: yCoord, left: xCoord,  pointerEvents: "none"  }}
    >
      <div>CLICK TO REVEAL</div>
    </div>
  );
};

export default Cursor;
