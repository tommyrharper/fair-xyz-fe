import type { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";
import BackButton from "../../components/back-button";
import Button from "../../components/button";
import Header from "../../components/header";
import {
  GetNftCollectionsDocument,
  useGetNftCollectionsQuery,
} from "../../generated/graphql";
import { DefaultLayout } from "../../layouts/default";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { NextPageWithLayout } from "../../utils/types";

const Upcoming: NextPageWithLayout<{}> = () => {
  const { data } = useGetNftCollectionsQuery();

  return (
    <>
      <Header text="Upcoming releases" />

      {data?.getNFTCollections.map((collection) => {
        return (
          <Button
            text={collection.name}
            href={`upcoming/${collection.name}`}
            key={collection.uuid}
          />
        );
      })}
      <BackButton href="/" />
    </>
  );
};

Upcoming.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
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
