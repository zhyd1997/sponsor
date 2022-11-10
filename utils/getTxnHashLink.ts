import { etherscanBlockExplorers } from "wagmi";

export const getTxnHashLink = (chainNetwork: string, txnHash: string) => {
  const network = chainNetwork as keyof typeof etherscanBlockExplorers;
  /** here optional chaining is important because the obj may be 'undefined' */
  const explorer = etherscanBlockExplorers[network]?.url;

  const txnHashLink = `${explorer}/tx/${txnHash}`;

  return txnHashLink;
};
