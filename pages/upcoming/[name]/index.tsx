import { ReactElement } from "react";
import BigButton from "../../../components/big-button";
import { NftCollectionType } from "../../../generated/graphql";
import { DefaultLayout } from "../../../layouts/default";
import { GridContainer } from "../../../layouts/grid-container";
import { getCollectionForServerSideProps } from "../../../utils";
import { NextPageWithLayout } from "../../../utils/types";

interface CollectionProps {
  collection: NftCollectionType;
}

const Collection: NextPageWithLayout<CollectionProps> = ({ collection }) => {
  return (
    <GridContainer>
      <BigButton
        text="Remind me"
        href={`/upcoming/${collection.name}/reminder`}
      />
      <BigButton text="Edit" href={`/upcoming/${collection.name}/edit`} />
      <BigButton text="Back" href="/upcoming" />
    </GridContainer>
  );
};

Collection.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps = getCollectionForServerSideProps;

export default Collection;
