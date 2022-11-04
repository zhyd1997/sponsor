import { FC } from "react";
import { etherscanBlockExplorers } from "wagmi";

import type { ChainT } from "@/types/index";

type TransactionHashLinkProps = {
  /** chain */
  chain: ChainT;
  /** transaction hash */
  txnHash: string;
};

export const TransactionHashLink: FC<TransactionHashLinkProps> = ({ chain, txnHash }) => {
  const network = chain.network as keyof typeof etherscanBlockExplorers;
  /** here optional chaining is important because the obj may be 'undefined' */
  const explorer = etherscanBlockExplorers[network]?.url;

  const txnHashLink = `${explorer}/tx/${txnHash}`;

  return (
    <p>
      Transaction Hash:&nbsp;
      <a href={txnHashLink} target="_blank">
        {txnHash.slice(0, 6)}...{txnHash.slice(-4)}
      </a>
    </p>
  );
};
