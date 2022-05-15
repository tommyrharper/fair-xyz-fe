import { ReactElement } from "react";
import Image from "next/Image";
import BackButton from "../../components/back-button";
import Header from "../../components/header";
import { DefaultLayout } from "../../layouts/default";
import { NextPageWithLayout } from "../../utils/types";
import nft from "../../public/nft.png";

const NFTImage = () => {
  return (
    <div className="mx-9">
      <Image src={nft} alt="loading" />
    </div>
  );
};

const Reveal: NextPageWithLayout<{}> = () => {
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
      {/* <div className="flex flex-row mb-4 justify-center items-center h-3/4"> */}
      {/* <div className="overflow-hidden w-1/3"> */}
      {/* </div> */}
      {/* </div> */}
      <div className="h-full flex flex-col justify-center px-40">{page}</div>
    </div>
  );
};

export default Reveal;
