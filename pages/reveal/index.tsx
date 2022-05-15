import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/Image";
import BackButton from "../../components/back-button";
import Header from "../../components/header";
import { DefaultLayout } from "../../layouts/default";
import { NextPageWithLayout } from "../../utils/types";
import nft from "../../public/nft.png";
import Cursor from "../../components/cursor";

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

const Reveal: NextPageWithLayout<{}> = () => {
  const [showCursor, setShowCursor] = useState<boolean>(false);

  return (
    <div className="flex">
      {showCursor && <Cursor />}
      <RevealImage setShowCursor={setShowCursor} />
      <RevealImage setShowCursor={setShowCursor} />
      <RevealImage setShowCursor={setShowCursor} />
      <RevealImage setShowCursor={setShowCursor} />
      {/* <BackButton href="/" /> */}
    </div>
  );
};

Reveal.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="bg-neutral-50 h-screen">
      {/* <div className="flex flex-row mb-4 justify-center items-center h-3/4"> */}
      {/* <div className="overflow-hidden w-1/3"> */}
      {/* </div> */}
      {/* </div> */}
      <div className="h-full flex flex-col justify-center px-40">{page}</div>
    </div>
  );
};

export default Reveal;
