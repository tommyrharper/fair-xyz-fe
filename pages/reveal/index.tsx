import { ReactElement } from "react";
import { NextPageWithLayout } from "../../utils/types";
import RevealImage from "../../components/reveal-image";
import BackButton from "../../components/back-button";
import Image from "next/Image";
import FRAME from "../../public/FRAME.png";

const Reveal: NextPageWithLayout<{}> = () => {
  return (
    <div className="flex">
      <RevealImage />
      <RevealImage />
      <RevealImage />
      <RevealImage />
    </div>
  );
};

Reveal.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className="bg-neutral-50 grid grid-cols-1 h-screen">
      <div className="w-32 mt-7 ml-7 -mb-7">
        <Image src={FRAME} alt="loading" layout="intrinsic" />
      </div>
      <div className="flex flex-col justify-center px-28">{page}</div>
      <div></div>
    </div>
  );
};

export default Reveal;
