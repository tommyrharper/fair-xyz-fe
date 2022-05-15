import { ReactElement } from "react";
import { NextPageWithLayout } from "../../utils/types";
import RevealImage from "../../components/reveal-image";
import { RevealLayout } from "../../layouts/reveal-layout";

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
  return <RevealLayout>{page}</RevealLayout>;
};

export default Reveal;
