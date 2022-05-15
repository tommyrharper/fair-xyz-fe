import { NextPageWithLayout } from "../utils/types";
import BigButton from "../components/big-button";

const Home: NextPageWithLayout<{}> = () => {
  return (
    <div className="bg-neutral-50 h-screen">
      <div className="grid grid-cols-1 h-full divide-y-2">
        <BigButton text="REVEAL NEW NFTS" href={`/reveal`} />
        <BigButton text="UPCOMING RELEASES" href={`/upcoming`} />
      </div>
    </div>
  );
};

export default Home;
