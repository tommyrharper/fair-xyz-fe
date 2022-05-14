import type { GetServerSidePropsContext, NextPage } from "next";
import {
  GetNftCollectionDocument,
  useGetNftCollectionQuery,
  NftCollectionType,
  GetNftCollectionQuery,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

interface CollectionProps {
  name: string;
}

const Collection: NextPage<CollectionProps> = ({ name }) => {
  const { data } = useGetNftCollectionQuery({
    variables: {
      name,
    },
  });

  const collection = data?.getNFTCollection;

  return (
    <div className="bg-neutral-50 h-screen">
      <div className="flex mb-4 justify-center items-center h-3/4">
        <div className="rounded overflow-hidden shadow-lg bg-cotton w-1/3">
          <div className="px-6 py-4">
            {/* <div className="font-bold text-xl mb-2 text-center">Manage your collections</div> */}

            <div className="font-NeueMontreal tablet:text-28px tablet:leading-34px laptop:text-33px laptop:leading-38px  desktop:text-40px desktop:leading-45px text-carbon inline mr-25">
              Manage your collections
            </div>

            <div className="flex-col items-center justify-center">
              <div className="mt-1.5 w-full">
                <button
                  type="button"
                  className="border rounded border-carbon hover:text-cotton hover:bg-carbon text-carbon p-0.5 mr-1.5 pl-1.5 pr-1.5 w-full"
                >
                  <p className="font-NeueMontreal tablet:text-14px tablet:leading-18px  laptop:text-20px laptop:leading-24px  desktop:text-24px desktop:leading-26px">
                    {collection?.name}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  query: { id },
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();

  const name = id;

  const { data } = await apolloClient.query<GetNftCollectionQuery>({
    query: GetNftCollectionDocument,
    variables: {
      name,
    },
  });

  if (!data?.getNFTCollection) {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: { name },
  });
};

export default Collection;
