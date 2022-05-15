import { PropsWithChildren } from "react";

export const GridContainer = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="grid grid-cols-1 h-full divide-y-2">{children}</div>;
};
