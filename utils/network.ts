import { chain } from "wagmi";

import type { Provider } from "@/types/index";

import { Framework } from "@superfluid-finance/sdk-core";
import { Network } from "alchemy-sdk";

/**
 * map networks to console.superfluid.finance explorer.
 */
export const sfNetwork = {
  [chain.optimism.network]: "optimism-mainnet",
  [chain.polygon.network]: "matic",
  [chain.goerli.network]: "goerli",
};

export const createSfFramework = async (provider: Provider, chainId: number): Promise<Framework> => {
  return await Framework.create({
    chainId,
    provider,
  });
};

export const alchemyNetwork = {
  [chain.polygon.network]: Network.MATIC_MAINNET,
  [chain.optimism.network]: Network.OPT_MAINNET,
};
