import { format } from "date-fns";
import type { GetServerSidePropsContext } from "next";
import { ReactElement, useState } from "react";
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

const getDateString = () => {};

interface EditCollectionProps {
  collection: NftCollectionType;
}

const EditCollection: NextPageWithLayout<EditCollectionProps> = ({
  collection,
}) => {
  const currentLaunchDate = collection.launchDate
    ? format(new Date(collection.launchDate), "yyyy-MM-d")
    : undefined;

  const [launchDate, setLaunchDate] = useState<string | undefined>(
    currentLaunchDate
  );

  console.log("launchDate", launchDate, typeof launchDate);

  return (
    <>
      <Header text={collection.name} />

      <TextInput placeholder={collection.name} />

      <div className="w-full mt-3 mb-4">
        <input
          type="date"
          value={launchDate}
          onChange={(e) => {
            setLaunchDate(e.target.value);
          }}
          className="w-full flex-1 font-NeueMontreal focus:outline-none bg-cotton border-b border-black placeholder-mid_gray placeholder-opacity-70  tablet:placeholder-14px tablet:h-8 laptop:placeholder-18px laptop:h-9 desktop:placeholder-22px transition-all duration-1500 outline-none"
        />
      </div>

      {/* <input
        type="date"
        id="start"
        name="trip-start"
        value="2018-07-22"
        min="2018-01-01"
        max="2018-12-31"
      ></input> */}

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
