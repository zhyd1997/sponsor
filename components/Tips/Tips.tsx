import { Alert } from "@/components/Alert";
import { FC } from "react";

type TipsProps = {
  /** ERC-20 Token */
  token: string;
  /** Super Token */
  superToken: string;
};

export const Tips: FC<TipsProps> = ({ token, superToken }) => {
  return (
    <Alert severity="error">
      No enough <b>{superToken}</b> (Super Token)?
      <br />
      Wrap some <b>{token}</b> on the&nbsp;
      <a
        href="https://app.superfluid.finance/wrap?upgrade"
        target="_blank"
      >
        Superfluid
      </a>
      &nbsp;page and then back.
    </Alert>
  );
};
