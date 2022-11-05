import { utils } from "ethers";

export const formatBalance = (tokenBalance: string, unit: "ether" | "mwei"): string => {
  const ether = utils.formatUnits(tokenBalance, unit);
  const balance = Number(ether).toFixed(6);

  return balance;
};
