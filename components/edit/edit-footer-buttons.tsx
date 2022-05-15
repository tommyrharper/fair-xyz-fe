import { NftCollectionType } from "../../generated/graphql";
import Button from "../button";
import { useEditFooterButtons } from "./hooks/use-edit-footer-button";

export interface EditFooterButtonsProps {
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
  const { onClickBack, onClickUpdate, loading } = useEditFooterButtons({
    dateUpdated,
    collection,
    launchDate,
    name,
  });

  return (
    <div className="flex justify-end mt-2">
      <div className="w-1/2 mr-3">
        <Button text="Back" onClick={onClickBack} />
      </div>
      <div className="w-1/2 ml-3">
        <Button
          text="Update"
          onClick={onClickUpdate}
          disabled={loading || !name}
        />
      </div>
    </div>
  );
};

export default EditFooterButtons;
