import { SetStateAction } from "react";

interface InputProps {
  label: string;
  setValue: (value: SetStateAction<string>) => void;
  value: string;
}

const Input = ({ label, value, setValue }: InputProps) => {
  return (
    <>
      <div className="text-sm text-carbon">{label.toUpperCase()}*</div>

      <input
        className="px-2 py-2.5 mt-2 mb-5 w-full focus:outline-none bg-cotton border border-mid-gray placeholder-mid-gray placeholder-opacity-70 transition-all duration-1500 outline-none"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
    </>
  );
};

export default Input;
