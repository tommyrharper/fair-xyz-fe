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
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cotton-50">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Choose a collection</div>
            {data?.getNFTCollections.map((collection) => {
              return (
                <p className="text-gray-700 text-base" key={collection.uuid}>
                  {collection.name}
                </p>
              );
            })}

          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>
      </div>

      {/* <div>test</div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">
            Start your free trial today.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </div> */}
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
