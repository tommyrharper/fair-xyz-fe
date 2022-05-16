import { Dispatch, SetStateAction } from "react";
import InputLabel from "./input-label";

interface DateInputProps {
  label: string;
  setDate: (value: SetStateAction<string>) => void;
  setDateUpdated: Dispatch<SetStateAction<boolean>>;
  dateUpdated: boolean;
  required?: boolean;
  date: string;
}

const DateInput = ({
  label,
  dateUpdated,
  setDate,
  setDateUpdated,
  date,
  required = false,
}: DateInputProps) => {
  return (
    <>
      <InputLabel name={label} required={required} />

      <input
        data-testid="date-input"
        className="px-2 py-2.5 mt-2 mb-5 w-full focus:outline-none bg-cotton border border-mid-gray placeholder-mid-gray placeholder-opacity-70 transition-all duration-1500 outline-none"
        type="date"
        value={date}
        onChange={(e) => {
          if (!dateUpdated) setDateUpdated(true);
          setDate(e.target.value);
        }}
      />
    </>
  );
};

export default DateInput;
