import type { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";
import BackButton from "../../../components/back-button";
import BigButton from "../../../components/big-button";
import Button from "../../../components/button";
import Header from "../../../components/header";
import {
  GetNftCollectionDocument,
  NftCollectionType,
  GetNftCollectionQuery,
} from "../../../generated/graphql";
import { DefaultLayout } from "../../../layouts/default";
import { addApolloState, initializeApollo } from "../../../lib/apolloClient";
import { NextPageWithLayout } from "../../../utils/types";

interface CollectionProps {
  collection: NftCollectionType;
}

const Collection: NextPageWithLayout<CollectionProps> = ({ collection }) => {
  return (
    <div className="bg-neutral-50 h-screen">
      <div className="grid grid-cols-1 h-full divide-y-2">
        <BigButton  text="Remind me" href={`/upcoming/${collection.name}/reminder`}/>
        <BigButton text="Edit" href={`/upcoming/${collection.name}/edit`}  />
        <BigButton text="Back" href="/upcoming" />
      </div>
    </div>
  );
};

// Collection.getLayout = function getLayout(page: ReactElement) {
//   return <DefaultLayout>{page}</DefaultLayout>;
// };

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
