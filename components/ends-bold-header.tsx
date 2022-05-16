interface EndsBoldHeaderProps {
  start: string;
  name: string;
}

const EndsBoldHeader = ({ start, name }: EndsBoldHeaderProps) => {
  return (
    <div className="mb-4">
      <span className="text-carbon text-lg">
        {start}{" "}
        <span className="font-NeueMontreal-medium">{name}</span>
      </span>
    </div>
  );
};

export default EndsBoldHeader;
