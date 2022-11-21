import { Alert } from "@/components/Alert";
import { FC, ReactNode } from "react";

type TipsProps = {
  children: ReactNode;
};

export const Tips: FC<TipsProps> = ({ children }) => {
  return (
    <Alert severity="error">
      {children}
    </Alert>
  );
};
