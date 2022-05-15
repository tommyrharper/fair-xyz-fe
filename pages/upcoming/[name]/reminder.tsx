import { ReactElement, useState } from "react";
import CreateReminderButton from "../../../components/reminder/create-reminder-button";
import Divider from "../../../components/reminder/divider";
import Input from "../../../components/reminder/input";
import ReminderHeader from "../../../components/reminder/reminder-header";
import TermsAndConditions from "../../../components/reminder/terms-and-conditions";
import { NftCollectionType } from "../../../generated/graphql";
import { ReminderLayout } from "../../../layouts/reminder-layout";
import { getCollectionFromQueryName } from "../../../utils";
import { NextPageWithLayout } from "../../../utils/types";

interface ReminderProps {
  collection: NftCollectionType;
}

const Reminder: NextPageWithLayout<ReminderProps> = ({ collection }) => {
  const [email, setEmail] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  return (
    <>
      <ReminderHeader name={collection.name} />
      <Input label="Email" setValue={setEmail} value={email} />
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

export const getServerSideProps = getCollectionFromQueryName;

export default Reminder;
