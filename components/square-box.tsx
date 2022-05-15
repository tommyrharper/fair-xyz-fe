import { PropsWithChildren } from "react";

interface SquareBoxProps {
  colour: string;
  onClick: () => void;
}

const SquareBox = ({
  colour,
  onClick,
  children,
}: PropsWithChildren<SquareBoxProps>) => {
  return (
    <div
      className={`bg-${colour} border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SquareBox;
