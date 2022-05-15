import router from "next/router";
import {
  InputMaybe,
  NftCollectionType,
  useUpdateNftCollectionMutation,
} from "../../generated/graphql";
import Button from "../button";

interface UpdateNftCollectionArgs {
  uuid: string;
  name?: InputMaybe<string> | undefined;
  launchDate?: any;
}

interface EditFooterButtonsProps {
  name: string;
  dateUpdated: boolean;
  collection: NftCollectionType;
  launchDate: string;
}

const EditFooterButtons = ({
  dateUpdated,
  collection,
  launchDate,
  name,
}: EditFooterButtonsProps) => {
  const [updateNftCollectionMutation, { data, loading }] =
    useUpdateNftCollectionMutation();

  return (
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
  );
};

export default EditFooterButtons;
