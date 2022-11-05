import { chain } from "wagmi";

import dai from "@/public/token/DAI.png";
import usdc from "@/public/token/USDC.png";
import type { Token } from "@/types/index";

export const tokenContractAddresses = {
  DAI: {
    /** https://polygonscan.com/token/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063 */
    [chain.polygon.network]: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    /** https://optimistic.etherscan.io/token/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1 */
    [chain.optimism.network]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  },
  USDC: {
    /** https://polygonscan.com/token/0x2791bca1f2de4661ed88a30c99a7a9449aa84174 */
    [chain.polygon.network]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    /** https://optimistic.etherscan.io/token/0x7f5c764cbc14f9669b88837ca1490cca17c31607 */
    [chain.optimism.network]: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
  },
};

export const tokens: Token[] = [
  {
    name: "DAI",
    /** http://brand.makerdao.com/ */
    icon: dai,
    unit: "ether",
  },
  {
    name: "USDC",
    /** https://usdcfaucet.com/ */
    icon: usdc,
    unit: "mwei",
  },
];
