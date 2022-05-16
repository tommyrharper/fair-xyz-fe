import { SetStateAction } from "react";
import SquareBox from "../square-box";

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
        <SquareBox colour="mid-gray" onClick={disagree}>
          <div className="text-cotton text-lg -mt-2.5">{agreed ? "✔" : ""}</div>
        </SquareBox>
      ) : (
        <SquareBox testId="agree" colour="cotton" onClick={agree} />
      )}
    </div>
  );
};

export default TermsAndConditions;
