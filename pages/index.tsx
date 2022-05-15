import { NextPageWithLayout } from "../utils/types";
import BigButton from "../components/big-button";
import { DefaultLayout } from "../layouts/default";
import { ReactElement } from "react";
import { GridContainer } from "../layouts/grid-container";

const Home: NextPageWithLayout<{}> = () => {
  return (
    <GridContainer>
      <BigButton text="REVEAL NEW NFTS" href={`/reveal`} />
      <BigButton text="UPCOMING RELEASES" href={`/upcoming`} />
    </GridContainer>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
