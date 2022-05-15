import { PropsWithChildren } from "react";

export const ReminderLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="bg-white h-screen">
      <div className="flex mb-4 justify-center items-center h-3/4">
        <div className="rounded overflow-hidden shadow-reminder bg-cotton w-1/3">
          <div className="px-6 py-4 my-2.5">{children}</div>
        </div>
      </div>
    </div>
  );
};
