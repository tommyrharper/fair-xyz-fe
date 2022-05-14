import type { GetServerSidePropsContext, NextPage } from "next";
import { ReactElement } from "react";
import Button from "../components/button";
import {
  GetNftCollectionsDocument,
  useGetNftCollectionsQuery,
} from "../generated/graphql";
import { DefaultLayout } from "../layouts/default";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import { NextPageWithLayout } from "../utils/types";

const Home: NextPageWithLayout<{}> = () => {
  const { data } = useGetNftCollectionsQuery();

  return (
    <>
      <div className="font-NeueMontreal tablet:text-28px tablet:leading-34px laptop:text-33px laptop:leading-38px  desktop:text-40px desktop:leading-45px text-carbon inline mr-25">
        Manage your collections
      </div>

      <div className="flex-col items-center justify-center">
        {data?.getNFTCollections.map((collection) => {
          return (
            <Button
              text={collection.name}
              href={`/${collection.name}`}
              key={collection.uuid}
            />
          );
        })}
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
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

export default Home;
