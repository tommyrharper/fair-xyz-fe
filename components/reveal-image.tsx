import { useState } from "react";
import Image from "next/Image";
import nft from "../public/nft.png";
import Cursor from "./cursor";

const RevealImage = () => {
  // TODO: refactor blur to be blur
  const [blur, setBlur] = useState<boolean>(true);
  const [showCursor, setShowCursor] = useState<boolean>(false);

  return (
    <div className="mx-9">
      <div
        className={blur ? "cursor-pointer" : undefined}
        onMouseMove={() => {
          setShowCursor(true);
        }}
        onMouseOut={() => {
          setShowCursor(false);
        }}
      >
        {showCursor && blur && <Cursor />}
        <Image
          src={nft}
          alt="loading"
          className={`transition-all duration-1500 ${blur ? "blur-lg" : ""}`}
          onClick={() => {
            setBlur(false);
          }}
        />
      </div>
    </div>
  );
};

export default RevealImage;
