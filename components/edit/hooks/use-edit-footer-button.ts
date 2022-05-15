import router from "next/router";
import { EditFooterButtonsProps } from "../edit-footer-buttons";
import { useEditCollection } from "./use-edit-collection";

export const useEditFooterButtons = ({
  collection,
  dateUpdated,
  launchDate,
  name,
}: EditFooterButtonsProps) => {
  const { onClickUpdate, loading, data } = useEditCollection({
    collection,
    dateUpdated,
    launchDate,
    name,
  });

  const onClickBack = () => {
    router.push(
      `/upcoming/${data?.updateNFTCollection.name || collection.name}`
    );
  };

  return {
    onClickBack,
    onClickUpdate,
    loading,
  };
};
