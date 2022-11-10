import { FC } from "react";

import type { ChainT } from "@/types/index";
import { getTxnHashLink } from "@/utils/getTxnHashLink";

type TransactionHashLinkProps = {
  /** chain */
  chain: ChainT;
  /** transaction hash */
  txnHash: string;
};

export const TransactionHashLink: FC<TransactionHashLinkProps> = ({ chain, txnHash }) => {
  const txnHashLink = getTxnHashLink(chain.network, txnHash);

  return (
    <p>
      Transaction Hash:&nbsp;
      <a href={txnHashLink} target="_blank">
        {txnHash.slice(0, 6)}...{txnHash.slice(-4)}
      </a>
    </p>
  );
};
