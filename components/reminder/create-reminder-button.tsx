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
      <div className="w-2/5">
        <Button text="Confirm" onClick={onClickConfirm} disabled={disabled} />
      </div>
    </div>
  );
};

export default CreateReminderButton;
