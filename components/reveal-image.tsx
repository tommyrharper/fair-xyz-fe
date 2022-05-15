import { useState } from "react";
import Image from "next/Image";
import nft from "../public/nft.png";
import Cursor from "./cursor";

const RevealImage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showCursor, setShowCursor] = useState<boolean>(false);

  return (
    <div className="mx-9">
      {showCursor && <Cursor />}
      <div
        className="cursor-pointer"
        onMouseEnter={() => {
          setShowCursor(true);
        }}
        onMouseLeave={() => {
          setShowCursor(false);
        }}
      >
        <Image
          src={nft}
          alt="loading"
          className={`transition-all duration-1500 ${visible ? "" : "blur-lg"}`}
          onClick={() => {
            setShowCursor(false);
            setVisible(true);
          }}
        />
      </div>
    </div>
  );
};

export default RevealImage;
