import type { GetServerSidePropsContext, NextPage } from "next";
import Button from "../components/button";
import {
  GetNftCollectionsDocument,
  useGetNftCollectionsQuery,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const Home: NextPage = () => {
  const { data } = useGetNftCollectionsQuery();

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
              {data?.getNFTCollections.map((collection) => {
                return (
                  <Button
                    text={collection.name}
                    href={`/${collection.name}`}
                    key={collection.uuid}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GetNftCollectionsDocument });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;
