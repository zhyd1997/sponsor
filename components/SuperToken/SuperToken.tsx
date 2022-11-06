import { createSfFramework } from "@/utils/createSfFramework";
import { formatBalance } from "@/utils/formatBalance";
import { FC, useEffect, useState } from "react";

import type { ChainT, Provider } from "@/types/index";

type SuperTokenProps = {
  /** account */
  account: string;
  /** provider */
  provider: Provider;
  /** chain */
  chain: ChainT;
  /** super token symbol */
  superTokenSymbol: string;
};

export const SuperToken: FC<SuperTokenProps> = ({ account, provider, chain, superTokenSymbol }) => {
  const [formattedBalance, setFormattedBalance] = useState("-");
  const [timestamp, setTimestamp] = useState(new Date().getTime());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimestamp(new Date().getTime());
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (!account) return;
    if (!chain) return;
    (async () => {
      const sf = await createSfFramework(provider, chain.id);
      const superToken = await sf.loadSuperToken(superTokenSymbol);

      const _balance = await superToken.balanceOf({
        account,
        providerOrSigner: provider,
      });

      const _formatedBalance = formatBalance(_balance, "ether");
      setFormattedBalance(_formatedBalance);
    })();
  }, [account, provider, chain, superTokenSymbol, timestamp]);

  return (
    <div
      style={{
        display: 'flex',
        width: '286px',
        justifyContent: 'flex-end',
        gap: '8px'
      }}
    >
      <span><b>{superTokenSymbol}</b>&nbsp;balance:</span>
      <span>{formattedBalance}</span>
    </div>
  );
};
