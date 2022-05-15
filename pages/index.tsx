import { ReactElement } from "react";
import Button from "../components/button";
import { DefaultLayout } from "../layouts/default";
import { NextPageWithLayout } from "../utils/types";

const Home: NextPageWithLayout<{}> = () => {
  return (
    <>
      <Button text="Upcoming releases" href={`/upcoming`} />
      <Button text="Reveal new nfts!" href={`/reveal`} />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
