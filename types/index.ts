import { ethers } from "ethers";
import type { Chain } from 'wagmi';

export type Provider = ethers.providers.Provider;

export type Signer = ethers.Signer;

export type ChainT = Chain & {
  unsupported?: boolean;
};

export type Unit = "ether" | "mwei";

export type Token = {
  name: "DAI" | "USDC";
  icon: any;
  unit: Unit;
};
