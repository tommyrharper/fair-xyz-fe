import { PropsWithChildren } from "react";

export const DefaultLayout = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="bg-neutral-50 h-screen">{children}</div>;
};
