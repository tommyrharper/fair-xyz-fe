import { SetStateAction } from "react";

interface TermsAndConditionsProps {
  setAgreed: (agreed: SetStateAction<boolean>) => void;
  agreed: boolean;
}

const TermsAndConditions = ({
  agreed,
  setAgreed,
}: TermsAndConditionsProps) => {
  return (
    <div className="font-RobotoMono text-sm text-carbon mt-2 mb-3.5 flex justify-start items-center">
      AGREE TO OUR TERMS AND CONDITIONS
      {agreed ? (
        <div
          className={`bg-mid-gray border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2`}
          onClick={() => {
            setAgreed(false);
          }}
        >
          <div className="text-cotton text-lg -mt-2.5">{agreed ? "✔" : ""}</div>
        </div>
      ) : (
        <div
          className={`bg-cotton border border-mid-gray w-4 h-4 cursor-pointer ml-5 transition-colors duration-300 border-2`}
          onClick={() => {
            setAgreed(true);
          }}
        ></div>
      )}
    </div>
  );
};

export default TermsAndConditions;
