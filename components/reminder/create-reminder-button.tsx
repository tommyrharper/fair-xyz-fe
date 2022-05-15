import Button from "../button";
import { useCreateReminder } from "./hooks/use-create-reminder";

export interface CreateReminderButtonProps {
  agreed: boolean;
  email: string;
  collectionId: string;
}

const CreateReminderButton = ({
  agreed,
  email,
  collectionId,
}: CreateReminderButtonProps) => {
  const { onClickConfirm, disabled } = useCreateReminder({
    agreed,
    email,
    collectionId,
  });

  return (
    <div className="flex justify-end">
      <div className="md:w-2/5 sm:w-full">
        <Button text="Confirm" onClick={onClickConfirm} disabled={disabled} />
      </div>
    </div>
  );
};

export default CreateReminderButton;
