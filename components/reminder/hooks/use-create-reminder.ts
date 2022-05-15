import router from "next/router";
import { useCreateReminderMutation } from "../../../generated/graphql";
import { CreateReminderButtonProps } from "../create-reminder-button";

export const useCreateReminder = ({
  agreed,
  email,
  collectionId,
}: CreateReminderButtonProps) => {
  const [createReminder, { loading }] = useCreateReminderMutation();

  const onClickConfirm = () => {
    createReminder({
      variables: {
        email,
        collection: collectionId,
      },
    });
    router.push(`/upcoming`);
  };

  const disabled = loading || !email || !agreed;

  return {
    onClickConfirm,
    disabled,
  };
};
