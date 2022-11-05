import { BigNumber, utils } from "ethers";

export const formatBalance = (tokenBalance: string): string => {
  const bnBalance = BigNumber.from(tokenBalance);
  const ether = utils.formatEther(bnBalance);
  const balance = Number(ether).toFixed(6);

  return balance;
};
