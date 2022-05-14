import type { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";
import BackButton from "../../components/back-button";
import Button from "../../components/button";
import Header from "../../components/header";
import TextInput from "../../components/text-input";
import {
  GetNftCollectionDocument,
  NftCollectionType,
  GetNftCollectionQuery,
} from "../../generated/graphql";
import { DefaultLayout } from "../../layouts/default";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { NextPageWithLayout } from "../../utils/types";

interface EditCollectionProps {
  collection: NftCollectionType;
}

const EditCollection: NextPageWithLayout<EditCollectionProps> = ({
  collection,
}) => {
  return (
    <>
      <Header text={collection.name} />

      <TextInput placeholder={collection.name} />
      <TextInput placeholder={collection.launchDate} />

      <Button text="Save" />
      <BackButton />
    </>
  );
};

EditCollection.getLayout = function getLayout(page: ReactElement) {
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

export default EditCollection;
