import router from "next/router";
import {
  InputMaybe,
  useUpdateNftCollectionMutation,
} from "../../../generated/graphql";
import { EditFooterButtonsProps } from "../edit-footer-buttons";

interface UpdateNftCollectionArgs {
  uuid: string;
  name?: InputMaybe<string> | undefined;
  launchDate?: any;
}

export const useEditCollection = ({
  collection,
  dateUpdated,
  launchDate,
  name,
}: EditFooterButtonsProps) => {
  const [updateNftCollectionMutation, { data, loading }] =
    useUpdateNftCollectionMutation();

  const onClickUpdate = async () => {
    const variables: UpdateNftCollectionArgs = {
      uuid: collection.uuid,
    };

    if (dateUpdated) variables.launchDate = launchDate ? launchDate : null;
    if (name && name !== collection.name) variables.name = name;

    await updateNftCollectionMutation({
      variables,
    });

    router.push(`/upcoming`);
  };

  return {
    onClickUpdate,
    loading,
    data,
  };
};
