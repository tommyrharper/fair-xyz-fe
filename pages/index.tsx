import { gql } from "@apollo/client";
import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  GetNftCollectionsDocument,
  useGetNftCollectionsQuery,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { loading, data } = useGetNftCollectionsQuery();

  return (
    <div className="bg-neutral-50 h-screen">
      <div className="flex mb-4 justify-center items-center h-3/4">

        <div className="rounded overflow-hidden shadow-lg bg-cotton w-1/3">
          <div className="px-6 py-4">

            <div className="font-bold text-xl mb-2 text-center">Manage your collections</div>

            <div className="flex-col items-center justify-center">
              {data?.getNFTCollections.map((collection) => {
                return (
                  <div className="mt-1.5 w-full" key={collection.uuid}>
                    <button
                      type="button"
                      className="border rounded border-carbon hover:text-cotton hover:bg-carbon text-carbon p-0.5 mr-1.5 pl-1.5 pr-1.5 w-full"
                    >
                      <p className="font-NeueMontreal tablet:text-14px tablet:leading-18px  laptop:text-20px laptop:leading-24px  desktop:text-24px desktop:leading-26px">
                        {collection.name}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GetNftCollectionsDocument });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
