import { ReactElement } from "react";
import BigButton from "../../components/big-button";
import CollectionButtonList from "../../components/upcoming/collection-button-list";
import { useGetNftCollectionsQuery } from "../../generated/graphql";
import { DefaultLayout } from "../../layouts/default";
import { GridContainer } from "../../layouts/grid-container";
import { getCollectionsForServerSideProps } from "../../utils";
import { NextPageWithLayout } from "../../utils/types";

const Upcoming: NextPageWithLayout<{}> = () => {
  const { data } = useGetNftCollectionsQuery();

  return (
    <GridContainer>
      <CollectionButtonList collectionsQueryData={data} />
      <BigButton text="Back" href="/" />
    </GridContainer>
  );
};

Upcoming.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps = getCollectionsForServerSideProps;

export default Upcoming;
