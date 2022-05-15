import { ReactElement } from "react";
import BackButton from "../../components/back-button";
import Header from "../../components/header";
import { DefaultLayout } from "../../layouts/default";
import { NextPageWithLayout } from "../../utils/types";

const Reveal: NextPageWithLayout<{}> = () => {

  return (
    <>
      <Header text="Reveal releases" />


      <BackButton href="/" />
    </>
  );
};

Reveal.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Reveal;
