import { GetNftCollectionsQuery } from "../../generated/graphql";
import BigButton from "../big-button";

interface CollectionButtonListProps {
  collectionsQueryData?: GetNftCollectionsQuery;
}

const CollectionButtonList = ({
  collectionsQueryData,
}: CollectionButtonListProps) => {
  return (
    <>
      {collectionsQueryData?.getNFTCollections
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((collection) => {
          return (
            <BigButton
              text={collection.name}
              href={`upcoming/${collection.name}`}
              key={collection.uuid}
            />
          );
        })}
    </>
  );
};

export default CollectionButtonList;
