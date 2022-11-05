import { FC, useEffect, useState } from "react";

import { Alchemy } from "alchemy-sdk";
import type { AlchemySettings } from "alchemy-sdk";

import Image from "next/image";

import Typography from '@mui/material/Typography';

import type { ChainT, Token } from "@/types/index";
import { alchemyNetwork } from "@/constants/network";
import { tokenContractAddresses } from "@/constants/tokens";
import { formatBalance } from "@/utils/formatBalance";

type TokenBalanceProps = {
  /** chain */
  chain: ChainT;
  /** account */
  account: string;
  /** token */
  token: Token;
};

export const TokenBalance: FC<TokenBalanceProps> = ({ chain, account, token }) => {
  const [balance, setBalance] = useState("-");

  useEffect(() => {
    (async () => {
      setBalance("-");

      const config: AlchemySettings = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
        network: alchemyNetwork[chain.network],
      };

      const alchemy = new Alchemy(config);

      const tokenContractAddress = [tokenContractAddresses[token.name][chain.network]];

      const data = await alchemy.core.getTokenBalances(account, tokenContractAddress);

      const { tokenBalance } = data.tokenBalances[0];

      if (!tokenBalance) {
        console.error("token balance is null");
        return;
      }

      const _balance = formatBalance(tokenBalance, token.unit);

      setBalance(_balance);
    })();
  }, [chain]);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <Typography variant="body1" component={"div"} sx={{ display: "flex" }}>
      <Image src={token.icon} alt={`${token.name} icon`} width={24} height={24} />
      &nbsp;{token.name}&nbsp;</Typography>
      <Typography variant="body1">{balance}</Typography>
    </div>
  )
};
