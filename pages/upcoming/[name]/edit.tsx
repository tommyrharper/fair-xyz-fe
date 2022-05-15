import router from "next/router";
import { ReactElement, useState } from "react";
import BackButton from "../../../components/back-button";
import Button from "../../../components/button";
import TextInput from "../../../components/text-input";
import {
  NftCollectionType,
  useUpdateNftCollectionMutation,
  InputMaybe,
} from "../../../generated/graphql";
import { DefaultLayout } from "../../../layouts/default";
import { getCollectionFromQueryName, getDateInputString } from "../../../utils";
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
      {/* <Header text={collection.name} /> */}

      <TextInput
        placeholder={collection.name}
        value={name}
        setValue={setName}
      />

      <div className="w-full mt-3 mb-4">
        <input
          type="date"
          value={launchDate}
          onChange={(e) => {
            if (!dateUpdated) setDateUpdated(true);
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

      <Button
        text="Save"
        onClick={() => {
          const variables: UpdateNftCollectionArgs = { uuid: collection.uuid };
          if (dateUpdated)
            variables.launchDate = launchDate ? launchDate : null;
          if (name && name !== collection.name) variables.name = name;

          updateNftCollectionMutation({
            variables,
          });
          router.push(`/upcoming`);
        }}
        disabled={loading}
      />
      <BackButton
        href={`/upcoming/${data?.updateNFTCollection.name || collection.name}`}
      />
    </>
  );
};

EditCollection.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps = getCollectionFromQueryName;

export default EditCollection;
