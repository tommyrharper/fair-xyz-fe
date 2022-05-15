import { ReactElement } from "react";
// import Button from "../components/button";
import { DefaultLayout } from "../layouts/default";
import { RevealLayout } from "../layouts/reveal-layout";
import { NextPageWithLayout } from "../utils/types";
import Image from "next/Image";
import FRAME from "../public/FRAME.png";
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
        className="border rounded-lg border-carbon hover:text-cotton hover:bg-carbon text-carbon w-full h-4/5"
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
      <div className="grid grid-cols-1 h-full">
        <div className="flex flex-col justify-center px-28 pt-10">
          <Button text="Upcoming releases" href={`/upcoming`} />
        </div>
        <div className="flex flex-col justify-center px-28 pb-10">
          <Button text="Reveal new nfts!" href={`/reveal`} />
        </div>
      </div>
    </div>
  );
};

export default Home;
