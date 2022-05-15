import { ReactElement, useState } from "react";
import CreateReminderButton from "../../../components/reminder/create-reminder-button";
import Divider from "../../../components/reminder/divider";
import ReminderHeader from "../../../components/reminder/reminder-header";
import TermsAndConditions from "../../../components/reminder/terms-and-conditions";
import TextInput from "../../../components/text-input";
import { NftCollectionType } from "../../../generated/graphql";
import { ReminderLayout } from "../../../layouts/reminder-layout";
import { getCollectionForServerSideProps } from "../../../utils";
import { NextPageWithLayout } from "../../../utils/types";

interface ReminderProps {
  collection: NftCollectionType;
}

const Reminder: NextPageWithLayout<ReminderProps> = ({ collection }) => {
  const [email, setEmail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  return (
    <>
      <ReminderHeader start="Get reminded about" name={collection.name} />
      <TextInput label="Email" setValue={setEmail} value={email} required />
      <TermsAndConditions agreed={agreed} setAgreed={setAgreed} />
      <Divider />
      <CreateReminderButton
        agreed={agreed}
        email={email}
        collectionId={collection.uuid}
      />
    </>
  );
};

Reminder.getLayout = function getLayout(page: ReactElement) {
  return <ReminderLayout>{page}</ReminderLayout>;
};

export const getServerSideProps = getCollectionForServerSideProps;

export default Reminder;
