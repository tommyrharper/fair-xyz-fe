import type { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";
import BackButton from "../../components/back-button";
import Button from "../../components/button";
import Header from "../../components/header";
import {
  GetNftCollectionDocument,
  NftCollectionType,
  GetNftCollectionQuery,
} from "../../generated/graphql";
import { DefaultLayout } from "../../layouts/default";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { NextPageWithLayout } from "../../utils/types";

interface CollectionProps {
  collection: NftCollectionType;
}

const Collection: NextPageWithLayout<CollectionProps> = ({ collection }) => {
  return (
    <>
      <Header text={collection.name} />

      <Button text="Edit" href={`/${collection.name}/edit`} />
      <Button text="Set reminder" />
      <BackButton href="/" />
    </>
  );
};

Collection.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps = async ({
  query: { name },
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<GetNftCollectionQuery>({
    query: GetNftCollectionDocument,
    variables: {
      name,
    },
  });

  const collection = data?.getNFTCollection;

  if (!collection) {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: { collection },
  });
};

export default Collection;
