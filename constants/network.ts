import { chain } from "wagmi";
import { Network } from "alchemy-sdk";

/**
 * map networks to console.superfluid.finance explorer.
 */
export const sfNetwork = {
  [chain.optimism.network]: "optimism-mainnet",
  [chain.polygon.network]: "matic",
  [chain.arbitrum.network]: "arbitrum-one",
  [chain.goerli.network]: "goerli",
};

export const alchemyNetwork = {
  [chain.polygon.network]: Network.MATIC_MAINNET,
  [chain.optimism.network]: Network.OPT_MAINNET,
  [chain.arbitrum.network]: Network.ARB_MAINNET,
  [chain.goerli.network]: Network.ETH_GOERLI,
};
