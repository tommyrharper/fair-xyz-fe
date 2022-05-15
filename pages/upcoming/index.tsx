import type { GetServerSidePropsContext } from "next";
import BigButton from "../../components/big-button";
import {
  GetNftCollectionsDocument,
  useGetNftCollectionsQuery,
} from "../../generated/graphql";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { NextPageWithLayout } from "../../utils/types";

const Upcoming: NextPageWithLayout<{}> = () => {
  const { data } = useGetNftCollectionsQuery();

  return (
    <div className="bg-neutral-50 h-screen">
      <div className="grid grid-cols-1 h-full divide-y-2">
        {data?.getNFTCollections.map((collection) => {
          return (
            <BigButton
              text={collection.name}
              href={`upcoming/${collection.name}`}
              key={collection.uuid}
            />
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  _serverSideContext: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GetNftCollectionsDocument });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Upcoming;
