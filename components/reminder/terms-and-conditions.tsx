import { SetStateAction } from "react";

interface TermsAndConditionsProps {
  setAgreed: (agreed: SetStateAction<boolean>) => void;
  agreed: boolean;
}

const TermsAndConditions = ({ agreed, setAgreed }: TermsAndConditionsProps) => {
  const agree = () => setAgreed(true);
  const disagree = () => setAgreed(false);

  return (
    <div className="font-RobotoMono text-sm text-carbon mt-2 mb-3.5 flex justify-start items-center">
      AGREE TO OUR TERMS AND CONDITIONS
      {agreed ? (
        <div
          data-testid="disagree"
          className="bg-mid-gray border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2"
          onClick={disagree}
        >
          <div className="text-cotton text-lg -mt-2.5">{agreed ? "✔" : ""}</div>
        </div>
      ) : (
        <div
          data-testid="agree"
          className="bg-cotton border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2"
          onClick={agree}
        />
      )}
    </div>
  );
};

export default TermsAndConditions;
