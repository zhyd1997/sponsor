import type { Provider } from "@/types/index";

import { Framework } from "@superfluid-finance/sdk-core";

export const createSfFramework = async (provider: Provider, chainId: number): Promise<Framework> => {
  return await Framework.create({
    chainId,
    provider,
  });
};
