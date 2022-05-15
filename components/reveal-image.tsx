import { useState } from "react";
import Image from "next/Image";
import nft from "../public/nft.png";
import Cursor from "./cursor";

const RevealImage = () => {
  // TODO: refactor visible to be blur
  const [visible, setVisible] = useState<boolean>(false);
  const [showCursor, setShowCursor] = useState<boolean>(false);

  return (
    <div className="mx-9">
      <div
        className={!visible ? "cursor-pointer" : undefined}
        onMouseMove={() => {
          setShowCursor(true);
        }}
        onMouseOut={() => {
          setShowCursor(false);
        }}
      >
        {showCursor && !visible && <Cursor />}
        <Image
          src={nft}
          alt="loading"
          className={`transition-all duration-1500 ${visible ? "" : "blur-lg"}`}
          onClick={() => {
            setVisible(true);
          }}
        />
      </div>
    </div>
  );
};

export default RevealImage;
