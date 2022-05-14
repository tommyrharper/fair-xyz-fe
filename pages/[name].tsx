import type { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import Button from "../components/button";
import {
  GetNftCollectionDocument,
  NftCollectionType,
  GetNftCollectionQuery,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

interface CollectionProps {
  collection: NftCollectionType;
}

const Collection: NextPage<CollectionProps> = ({ collection }) => {
  return (
    <div className="bg-neutral-50 h-screen">
      <div className="flex mb-4 justify-center items-center h-3/4">
        <div className="rounded overflow-hidden shadow-lg bg-cotton w-1/3">
          <div className="px-6 py-4">
            {/* <div className="font-bold text-xl mb-2 text-center">Manage your collections</div> */}

            <div className="font-NeueMontreal tablet:text-28px tablet:leading-34px laptop:text-33px laptop:leading-38px  desktop:text-40px desktop:leading-45px text-carbon inline mr-25">
              {collection.name}
            </div>

            <div className="flex-col items-center justify-center">
              <Button text="Edit" />
              <Button text="Set reminder" />
              <Button text="Back" href="/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  query: { name },
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<GetNftCollectionQuery>({
    query: GetNftCollectionDocument,
    variables: {
      name,
    },
  });

  const collection = data?.getNFTCollection;

  if (!collection) {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: { collection },
  });
};

export default Collection;
