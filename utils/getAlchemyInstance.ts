import { Alchemy } from "alchemy-sdk";
import type { AlchemySettings } from "alchemy-sdk";
import { alchemyNetwork } from "@/constants/network";

export const getAlchemyInstance = (chainNetwork: string) => {
  const config: AlchemySettings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: alchemyNetwork[chainNetwork],
  };

  return new Alchemy(config);
};
