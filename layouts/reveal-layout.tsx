import { PropsWithChildren } from "react";
import Image from "next/Image";
import FRAME from "../public/FRAME.png";

export const RevealLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="bg-neutral-50 grid grid-cols-1 h-screen">
      <div className="w-32 mt-7 ml-7 -mb-7">
        <Image src={FRAME} alt="loading" layout="intrinsic" />
      </div>
      <div className="flex flex-col justify-center px-28">{children}</div>
      <div></div>
    </div>
  );
};
