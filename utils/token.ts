import { chain } from "wagmi";

export const token = {
  DAI: {
    /** https://polygonscan.com/token/0x8f3cf7ad23cd3cadbd9735aff958023239c6a063 */
    [chain.polygon.network]: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    /** https://optimistic.etherscan.io/token/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1 */
    [chain.optimism.network]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  }
};
