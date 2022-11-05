import dynamic from "next/dynamic";
import { FC } from "react";

import Typography from '@mui/material/Typography';
import { tokens } from '@/constants/tokens';
import type { ChainT } from "@/types/index";

const TokenBalance = dynamic(() => import("@/components/TokenBalance").then((mod) => mod.TokenBalance));

type ERC20Props = {
  /** chain */
  chain: ChainT;
  /** account */
  account: string;
};

export const ERC20: FC<ERC20Props> = ({ chain, account }) => {
  return (
    <>
      <div>
      <Typography variant="subtitle1">Your ERC-20 Token Balances: </Typography>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {tokens.map((token) => {
          return (
            <TokenBalance key={token.name} chain={chain} account={account} token={token} />
          );
        })}
      </div>
    </>
  );
};
