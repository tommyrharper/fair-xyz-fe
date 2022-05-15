import { SetStateAction } from "react";
import TextInputLabel from "./input-label";

interface TextInputProps {
  label: string;
  setValue: (value: SetStateAction<string>) => void;
  value: string;
  required?: boolean;
}

const TextInput = ({
  label,
  value,
  setValue,
  required = false,
}: TextInputProps) => {
  return (
    <>
      <TextInputLabel name={label} required={required} />

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

export default TextInput;
