import { ReactElement, useEffect, useState } from "react";
import Image from "next/Image";
import BackButton from "../../components/back-button";
import Header from "../../components/header";
import { DefaultLayout } from "../../layouts/default";
import { NextPageWithLayout } from "../../utils/types";
import nft from "../../public/nft.png";

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
      className={`absolute -translate-x-2/4 -translate-y-full`}
      style={{ top: yCoord, left: xCoord }}
    >
      <div>CLICK TO REVEAL</div>
    </div>
  );
};

const NFTImage = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="mx-9">
      <div className="cursor-pointer">
        {/* <div className="cursor-fancy"> */}
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
  // const [xCoord, setXCoord] = useState<number>(0);
  // const [yCoord, setYCoord] = useState<number>(0);

  // useEffect(() => {
  //   const cursorTag = document.querySelector("div.customCursor");
  //   const ball = cursorTag?.querySelector("div");
  //   if (!ball) return;

  //   const handleMouseMove = (event: MouseEvent) => {
  //     console.log('event', event.pageX, event.pageY);
  //     setXCoord(event.pageX);
  //     setYCoord(event.pageY);
  //     // ball.style.left = event.pageX + "px";
  //     // ball.style.top = event.pageY + "px";
  //   };

  //   console.log('adding event listener')
  //   document.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // });
  return (
    <div className="flex">
      <NFTImage />
      <NFTImage />
      <NFTImage />
      <NFTImage />
      {/* <BackButton href="/" /> */}
    </div>
  );
};

Reveal.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="bg-neutral-50 h-screen">
      <Cursor />
      {/* <div className="flex flex-row mb-4 justify-center items-center h-3/4"> */}
      {/* <div className="overflow-hidden w-1/3"> */}
      {/* </div> */}
      {/* </div> */}
      <div className="h-full flex flex-col justify-center px-40">{page}</div>
    </div>
  );
};

export default Reveal;
