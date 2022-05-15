interface ReminderHeaderProps {
  name: string;
}

const ReminderHeader = ({ name }: ReminderHeaderProps) => {
  return (
    <div className="mb-4">
      <span className="text-carbon text-lg">
        Get reminded about{" "}
        <span className="font-NeueMontreal-medium">{name}</span>
      </span>
    </div>
  );
};

export default ReminderHeader;
