import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/Image";
import nft from "../public/nft.png";

interface RevealImageProps {
  setShowCursor: Dispatch<SetStateAction<boolean>>;
}

const RevealImage = ({ setShowCursor }: RevealImageProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="mx-9">
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
            setVisible(true);
          }}
        />
      </div>
    </div>
  );
};

export default RevealImage;
