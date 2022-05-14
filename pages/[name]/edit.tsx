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

interface EditCollectionProps {
  collection: NftCollectionType;
}

const EditCollection: NextPageWithLayout<EditCollectionProps> = ({
  collection,
}) => {
  return (
    <>
      <Header text={collection.name} />

      <div className="w-full mt-3 mb-4">
        <input
          className="w-full flex-1 font-NeueMontreal focus:outline-none bg-cotton border-b border-black placeholder-mid_gray placeholder-opacity-70  tablet:text-14px tablet:h-8 laptop:text-18px laptop:h-9 desktop:text-22px transition-all duration-1500 outline-none"
          placeholder={collection.name}
        />
      </div>

      <div className="w-full mt-3 mb-4">
        <input
          className="w-full flex-1 font-NeueMontreal focus:outline-none bg-cotton border-b border-black placeholder-mid_gray placeholder-opacity-70  tablet:text-14px tablet:h-8 laptop:text-18px laptop:h-9 desktop:text-22px transition-all duration-1500 outline-none"
          placeholder={collection.launchDate}
        />
      </div>

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
