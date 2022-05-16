import { PropsWithChildren } from "react";

interface SquareBoxProps {
  colour: string;
  onClick: () => void;
  testId?: string;
}

const SquareBox = ({
  colour,
  onClick,
  children,
  testId,
}: PropsWithChildren<SquareBoxProps>) => {
  return (
    <div
      data-testid={testId}
      className={`bg-${colour} border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SquareBox;
