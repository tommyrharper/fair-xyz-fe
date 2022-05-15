import BigButton from "../../components/big-button";
import { useGetNftCollectionsQuery } from "../../generated/graphql";
import { getCollectionsForServerSideProps } from "../../utils";
import { NextPageWithLayout } from "../../utils/types";

const Upcoming: NextPageWithLayout<{}> = () => {
  const { data } = useGetNftCollectionsQuery();

  return (
    <div className="bg-neutral-50 h-screen">
      <div className="grid grid-cols-1 h-full divide-y-2">
        {data?.getNFTCollections
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
        <BigButton text="Back" href="/" />
      </div>
    </div>
  );
};

export const getServerSideProps = getCollectionsForServerSideProps;

export default Upcoming;
