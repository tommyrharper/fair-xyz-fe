import router from "next/router";
import { useCreateReminderMutation } from "../../generated/graphql";
import Button from "../button";

interface CreateReminderButtonProps {
  agreed: boolean;
  email: string;
  collectionId: string;
}

const CreateReminderButton = ({
  agreed,
  email,
  collectionId,
}: CreateReminderButtonProps) => {
  const [createReminder, { loading }] = useCreateReminderMutation();

  return (
    <div className="flex justify-end">
      <div className="w-2/5">
        <Button
          text="Confirm"
          onClick={() => {
            createReminder({
              variables: {
                email,
                collection: collectionId,
              },
            });
            router.push(`/upcoming`);
          }}
          disabled={loading || !email || !agreed}
        />
      </div>
    </div>
  );
};

export default CreateReminderButton;
