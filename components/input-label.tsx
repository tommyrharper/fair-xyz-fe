interface InputLabelProps {
  name: string;
  required?: boolean;
}

const InputLabel = ({ name, required = false }: InputLabelProps) => {
  return (
    <div className="text-sm text-carbon">
      {name.toUpperCase()}
      {required ? "*" : ""}
    </div>
  );
};

export default InputLabel;
