import { ReactElement, useState } from "react";
import DateInput from "../../../components/date-input";
import EditFooterButtons from "../../../components/edit/edit-footer-buttons";
import ReminderHeader from "../../../components/reminder/reminder-header";
import TextInput from "../../../components/text-input";
import { NftCollectionType } from "../../../generated/graphql";
import { ReminderLayout } from "../../../layouts/reminder-layout";
import {
  getCollectionForServerSideProps,
  getDateInputString,
} from "../../../utils";
import { NextPageWithLayout } from "../../../utils/types";

interface EditCollectionProps {
  collection: NftCollectionType;
}

const EditCollection: NextPageWithLayout<EditCollectionProps> = ({
  collection,
}) => {
  const [launchDate, setLaunchDate] = useState<string>(
    getDateInputString(collection.launchDate)
  );
  const [name, setName] = useState<string>(collection.name);
  const [dateUpdated, setDateUpdated] = useState<boolean>(false);

  return (
    <>
      <ReminderHeader start="Edit" name={collection.name} />
      <TextInput label="Name" setValue={setName} value={name} required />
      <DateInput
        label="Launch Date"
        setDate={setLaunchDate}
        setDateUpdated={setDateUpdated}
        dateUpdated={dateUpdated}
        date={launchDate}
      />
      <EditFooterButtons
        dateUpdated={dateUpdated}
        collection={collection}
        launchDate={launchDate}
        name={name}
      />
    </>
  );
};

EditCollection.getLayout = function getLayout(page: ReactElement) {
  return <ReminderLayout>{page}</ReminderLayout>;
};

export const getServerSideProps = getCollectionForServerSideProps;

export default EditCollection;
