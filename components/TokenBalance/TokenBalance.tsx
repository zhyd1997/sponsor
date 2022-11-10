import { FC, useEffect, useState } from "react";

import Image from "next/image";

import Typography from '@mui/material/Typography';

import type { ChainT, Token } from "@/types/index";
import { tokenContractAddresses } from "@/constants/tokens";
import { formatBalance } from "@/utils/formatBalance";
import { getAlchemyInstance } from "@/utils/getAlchemyInstance";

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
      const alchemy = getAlchemyInstance(chain.network);

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
  }, [chain, account]);

  return (
    <div style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
      <Typography variant="body1" component={"div"} sx={{ display: "flex" }}>
      <Image src={token.icon} alt={`${token.name} icon`} width={24} height={24} />
      &nbsp;{token.name}&nbsp;</Typography>
      <Typography variant="body1">{balance}</Typography>
    </div>
  )
};
