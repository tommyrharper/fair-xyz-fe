import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import BackButton from "../../../components/back-button";
import Button from "../../../components/button";
import Header from "../../../components/header";
import TextInput from "../../../components/text-input";
import {
  GetNftCollectionDocument,
  NftCollectionType,
  GetNftCollectionQuery,
  useCreateReminderMutation,
} from "../../../generated/graphql";
import { DefaultLayout } from "../../../layouts/default";
import { addApolloState, initializeApollo } from "../../../lib/apolloClient";
import { NextPageWithLayout } from "../../../utils/types";

interface ReminderProps {
  collection: NftCollectionType;
}

const Reminder: NextPageWithLayout<ReminderProps> = ({ collection }) => {
  const [email, setName] = useState<string>("");

  const [createReminder, { data, loading, error }] =
    useCreateReminderMutation();


  return (
    <>
      <Header text={collection.name} />

      <div>
        <Header text="EMAIL" />
        <TextInput placeholder="Enter email" value={email} setValue={setName} />
      </div>

      <Button
        text="Confirm"
        onClick={() => {
          createReminder({
            variables: {
              email,
              collection: collection.uuid,
            },
          });
        }}
        disabled={loading}
      />
      <BackButton href={`/upcoming/${collection.name}`} />
    </>
  );
};

Reminder.getLayout = function getLayout(page: ReactElement) {
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

export default Reminder;
