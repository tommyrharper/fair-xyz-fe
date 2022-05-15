import { ReactElement } from "react";
import { NextPageWithLayout } from "../utils/types";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href: string;
  disabled?: boolean;
}

const Button = ({ text, href, disabled = false }: ButtonProps) => {
  return (
    <Link href={href} className="flex-col items-center justify-center h-full">
      <button
        type="button"
        className="hover:text-cotton hover:bg-carbon text-carbon w-full h-full"
        disabled={disabled}
      >
        <p className="font-NeueMontreal text-2xl">{text.toUpperCase()}</p>
      </button>
    </Link>
  );
};

const Home: NextPageWithLayout<{}> = () => {
  return (
    <div className="bg-neutral-50 h-screen">
      <div className="grid grid-cols-1 h-full divide-y-2">
        <div className="flex flex-col justify-center">
          <Button text="UPCOMING RELEASES" href={`/upcoming`} />
        </div>
        <div className="flex flex-col justify-center">
          <Button text="REVEAL NEW NFTS" href={`/reveal`} />
        </div>
      </div>
    </div>
  );
};

export default Home;
