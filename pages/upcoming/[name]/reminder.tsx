import type { GetServerSidePropsContext } from "next";
import router, { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import Button from "../../../components/button";
import {
  GetNftCollectionDocument,
  NftCollectionType,
  GetNftCollectionQuery,
  useCreateReminderMutation,
} from "../../../generated/graphql";
import { ReminderLayout } from "../../../layouts/reminder-layout";
import { addApolloState, initializeApollo } from "../../../lib/apolloClient";
import { NextPageWithLayout } from "../../../utils/types";

interface ReminderProps {
  collection: NftCollectionType;
}

const Reminder: NextPageWithLayout<ReminderProps> = ({ collection }) => {
  const [email, setName] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  const [createReminder, { data, loading, error }] =
    useCreateReminderMutation();

  return (
    <div>
      <div className="mb-4">
        <span className="text-carbon text-lg">
          Get reminded about{" "}
          <span className="font-NeueMontreal-medium">{collection.name}</span>
        </span>
      </div>

      <div className="text-sm text-carbon">EMAIL*</div>

      <input
        className="px-2 py-2.5 mt-2 mb-5 w-full focus:outline-none bg-cotton border border-mid-gray placeholder-mid-gray placeholder-opacity-70 transition-all duration-1500 outline-none"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={email}
      />

      <div className="font-RobotoMono text-sm text-carbon mt-2 mb-3.5 flex justify-start items-center">
        AGREE TO OUR TERMS AND CONDITIONS
        <input
          type="checkbox"
          className="absolute opacity-0 hidden w-0 h-0"
          onChange={(e) => {
            setAgreed(e.target.checked);
          }}
          checked={agreed}
        />
        {agreed ? (
          <div
            className={`bg-mid-gray border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2`}
            onClick={() => {
              setAgreed(false);
            }}
          >
            <div className="text-cotton text-lg -mt-2.5">
              {agreed ? "✔" : ""}
            </div>
          </div>
        ) : (
          <div
            className={`bg-cotton border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2`}
            onClick={() => {
              setAgreed(true);
            }}
          ></div>
        )}
      </div>

      <div className="pt-5 pb-3">
        <div className="flex-grow border-t border-mid-gray"></div>
      </div>

      <div className="flex justify-end">
        <div className="w-2/5">
          <Button
            text="Confirm"
            onClick={() => {
              createReminder({
                variables: {
                  email,
                  collection: collection.uuid,
                },
              });
              router.push(`/upcoming`);
            }}
            disabled={loading || !email || !agreed}
          />
        </div>
      </div>
    </div>
  );
};

Reminder.getLayout = function getLayout(page: ReactElement) {
  return <ReminderLayout>{page}</ReminderLayout>;
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
