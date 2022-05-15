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
import RevealImage from "../../components/reveal-image";


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
