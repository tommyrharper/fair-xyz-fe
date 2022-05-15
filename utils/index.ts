import { format } from "date-fns";
import { GetServerSidePropsContext } from "next";
import {
  GetNftCollectionQuery,
  GetNftCollectionDocument,
  GetNftCollectionsDocument,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

export const getDateInputString = (date: Date | null): string =>
  date ? format(new Date(date), "yyyy-MM-d") : "";

export const getCollectionForServerSideProps = async ({
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

export const getCollectionsForServerSideProps = async (
  _serverSideContext: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GetNftCollectionsDocument });

  return addApolloState(apolloClient, {
    props: {},
  });
};
