import type { GetServerSidePropsContext } from "next";
import router, { useRouter } from "next/router";
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
    <div className="my-2.5">
      <span className="font-NeueMontreal tablet:text-28px tablet:leading-34px laptop:text-33px laptop:leading-38px  desktop:text-40px desktop:leading-45px text-carbon">
        Get reminded about{" "}
        <span className="font-semibold">{collection.name}</span>
      </span>

      <div>
        <Header text="EMAIL*" />
        <div className="w-full mb-4">
          <input
            className="w-full flex-1 font-NeueMontreal focus:outline-none bg-cotton border border-mid-gray placeholder-mid-gray placeholder-opacity-70  tablet:placeholder-14px tablet:h-8 laptop:placeholder-18px laptop:h-9 desktop:placeholder-22px transition-all duration-1500 outline-none px-2 py-2.5"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={email}
          />
          <Header text="Agree to our terms and conditions" />
          <div className="py-5">
            <div className="flex-grow border-t border-mid-gray"></div>
          </div>
        </div>
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
          router.push(`/upcoming/${collection.name}`);
        }}
        disabled={loading || !email}
      />
    </div>
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
