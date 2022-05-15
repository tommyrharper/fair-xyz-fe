interface ReminderHeaderProps {
  start: string;
  name: string;
}

const ReminderHeader = ({ start, name }: ReminderHeaderProps) => {
  return (
    <div className="mb-4">
      <span className="text-carbon text-lg">
        {start}{" "}
        <span className="font-NeueMontreal-medium">{name}</span>
      </span>
    </div>
  );
};

export default ReminderHeader;
