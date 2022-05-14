import type { GetServerSidePropsContext, NextPage } from "next";
import { ReactElement } from "react";
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

      <div className="flex-col items-center justify-center">
        <Button text="Edit" href={`/${collection.name}/edit`} />
        <Button text="Set reminder" />
        <Button text="Back" href="/" />
      </div>
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
