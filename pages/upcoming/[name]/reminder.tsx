import type { GetServerSidePropsContext } from "next";
import router, { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import Button from "../../../components/button";
import Input from "../../../components/reminder/input";
import ReminderHeader from "../../../components/reminder/reminder-header";
import TermsAndConditions from "../../../components/reminder/terms-and-conditions";
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
  const [email, setEmail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  const [createReminder, { data, loading, error }] =
    useCreateReminderMutation();

  return (
    <div>
      <ReminderHeader name={collection.name} />
      <Input label="Email" setValue={setEmail} value={email} />

      <TermsAndConditions agreed={agreed} setAgreed={setAgreed} />

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
