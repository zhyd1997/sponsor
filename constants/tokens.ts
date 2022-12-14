import { chain } from "wagmi";

import dai from "@/assets/token/DAI.png";
import usdc from "@/assets/token/USDC.png";
import type { Token } from "@/types/index";

export const tokenContractAddresses = {
  DAI: {
    /** https://polygonscan.com/token/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063 */
    [chain.polygon.network]: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    /** https://optimistic.etherscan.io/token/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1 */
    [chain.optimism.network]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    /** https://arbiscan.io/token/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1 */
    [chain.arbitrum.network]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  },
  USDC: {
    /** https://polygonscan.com/token/0x2791bca1f2de4661ed88a30c99a7a9449aa84174 */
    [chain.polygon.network]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    /** https://optimistic.etherscan.io/token/0x7f5c764cbc14f9669b88837ca1490cca17c31607 */
    [chain.optimism.network]: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    /** https://arbiscan.io/token/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8 */
    [chain.arbitrum.network]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  },
  /** Superfluid Stream: FlowNFT */
  SFS: {
    /** https://polygonscan.com/address/0xfbd3363e2fc4db7ce069dd422a54cc5c5eaca9b7 */
    [chain.polygon.network]: "0xfBD3363E2FC4db7cE069dd422A54cc5C5EaCA9b7",
    /** https://optimistic.etherscan.io/address/0x91cf787b441207e6fab4e18320521c3d23c587e3 */
    [chain.optimism.network]: "0x91CF787b441207e6faB4e18320521c3d23c587E3",
    /** https://arbiscan.io/address/0x91cf787b441207e6fab4e18320521c3d23c587e3 */
    [chain.arbitrum.network]: "0x91CF787b441207e6faB4e18320521c3d23c587E3",
    /** https://goerli.etherscan.io/address/0x91cf787b441207e6fab4e18320521c3d23c587e3 */
    [chain.goerli.network]: "0x91CF787b441207e6faB4e18320521c3d23c587E3",
  }
};

export const tokens: Token[] = [
  {
    name: "DAI",
    superTokenSymbol: "DAIx",
    /** http://brand.makerdao.com/ */
    icon: dai,
    unit: "ether",
  },
  {
    name: "USDC",
    superTokenSymbol: "USDCx",
    /** https://usdcfaucet.com/ */
    icon: usdc,
    unit: "mwei",
  },
];
