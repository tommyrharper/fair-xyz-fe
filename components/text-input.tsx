import { ChangeEventHandler, SetStateAction } from "react";

interface TextInputProps {
  placeholder: string;
  setValue: (value: SetStateAction<string>) => void;
  value: string;
}

const TextInput = ({ placeholder, setValue, value }: TextInputProps) => {
  return (
    <div className="w-full mb-4">
      <input
        className="w-full flex-1 font-NeueMontreal focus:outline-none bg-cotton border-b border-black placeholder-mid_gray placeholder-opacity-70  tablet:placeholder-14px tablet:h-8 laptop:placeholder-18px laptop:h-9 desktop:placeholder-22px transition-all duration-1500 outline-none"
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export default TextInput;
