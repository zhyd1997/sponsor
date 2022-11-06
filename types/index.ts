import { ethers } from "ethers";
import type { Chain } from 'wagmi';

export type Provider = ethers.providers.Provider;

export type Signer = ethers.Signer;

export type ChainT = Chain & {
  unsupported?: boolean;
};

export type Unit = "ether" | "mwei";

/**
 * @notice the order of the key should be consists with the type of `Tokens`'s `superTokenSymbol`.
 */
export enum T {
  "DAIx",
  "USDCx",
};

export type Token = {
  name: "DAI" | "USDC";
  icon: any;
  superTokenSymbol: keyof typeof T;
  /** Alchemy balance format */
  unit: Unit;
};
