import { chain } from "wagmi";

/**
 * map networks to console.superfluid.finance explorer.
 */
export const sfNetwork = {
  [chain.optimism.network]: "optimism-mainnet",
  [chain.polygon.network]: "matic",
  [chain.goerli.network]: "goerli",
};
