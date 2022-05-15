import { ReactElement } from "react";
import { NextPageWithLayout } from "../../utils/types";
import RevealImage from "../../components/reveal-image";

const Reveal: NextPageWithLayout<{}> = () => {
  return (
    <div className="flex">
      <RevealImage />
      <RevealImage />
      <RevealImage />
      <RevealImage />
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
