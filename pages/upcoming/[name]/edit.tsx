import router from "next/router";
import { ReactElement, useState } from "react";
import BackButton from "../../../components/back-button";
import Button from "../../../components/button";
import DateInput from "../../../components/date-input";
import Divider from "../../../components/reminder/divider";
import Input from "../../../components/reminder/input";
import ReminderHeader from "../../../components/reminder/reminder-header";
import TextInput from "../../../components/text-input";
import {
  NftCollectionType,
  useUpdateNftCollectionMutation,
  InputMaybe,
} from "../../../generated/graphql";
import { ReminderLayout } from "../../../layouts/reminder-layout";
import {
  getCollectionForServerSideProps,
  getDateInputString,
} from "../../../utils";
import { NextPageWithLayout } from "../../../utils/types";

interface UpdateNftCollectionArgs {
  uuid: string;
  name?: InputMaybe<string> | undefined;
  launchDate?: any;
}

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

  const [updateNftCollectionMutation, { data, loading, error }] =
    useUpdateNftCollectionMutation();

  return (
    <>
      <ReminderHeader start="Edit" name={collection.name} />

      <Input label="Name" setValue={setName} value={name} required />

      <DateInput
        label="Launch Date"
        setDate={setLaunchDate}
        setDateUpdated={setDateUpdated}
        dateUpdated={dateUpdated}
        date={launchDate}
      />

      <div className="flex justify-end mt-2">
        <div className="w-1/2 mr-3">
          <Button
            text="Back"
            onClick={() => {
              router.push(
                `/upcoming/${data?.updateNFTCollection.name || collection.name}`
              );
            }}
            disabled={loading}
          />
        </div>
        <div className="w-1/2 ml-3">
          <Button
            text="Confirm"
            onClick={() => {
              const variables: UpdateNftCollectionArgs = {
                uuid: collection.uuid,
              };
              if (dateUpdated)
                variables.launchDate = launchDate ? launchDate : null;
              if (name && name !== collection.name) variables.name = name;

              updateNftCollectionMutation({
                variables,
              });
              router.push(`/upcoming`);
            }}
            disabled={loading || !name}
          />
        </div>
      </div>
    </>
  );
};

EditCollection.getLayout = function getLayout(page: ReactElement) {
  return <ReminderLayout>{page}</ReminderLayout>;
};

export const getServerSideProps = getCollectionForServerSideProps;

export default EditCollection;
