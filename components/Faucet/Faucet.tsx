import { faucetABI, faucetGoerliAddress } from '@/abi/index';
import type { Provider, Signer } from '@/types/index';
import Button from '@mui/material/Button';
import { ethers } from 'ethers';

import dynamic from 'next/dynamic';

import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { chain } from 'wagmi';

const Tips = dynamic(() => import("@/components/Tips").then((mod) => mod.Tips));

type FaucetProps = {
  /** provider */
  provider: Provider;
  /** signer */
  signer: Signer;
  /** chain id */
  chainId: number;
};

export const Faucet: FC<FaucetProps> = ({ provider, signer, chainId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getFaucet = async () => {
    setIsLoading(true);

    try {
      toast.info("Waiting for user's operations...");
      const faucetContract = new ethers.Contract(faucetGoerliAddress, faucetABI, provider);

      await faucetContract.connect(signer).tapFaucet();
      toast.success("Claimed successfully!");
    } catch (e: any) {
      const _error = e?.reason ?? e?.message?.split(" (")[0]?.split(" [")[0];
      toast.error(_error);
      setError(_error);
      console.error(e);
    }

    setIsLoading(false);
  };

  if (chainId !== chain.goerli.id) {
    return null;
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ textTransform: 'none' }}
        disabled={isLoading}
        onClick={getFaucet}
      >
        Get 100k fDAIx
      </Button>
      {error ? (
        <div style={{ margin: "16px 0" }}>
          <Tips>
            <>
              Please go to&nbsp;
              <a
                href="https://app.superfluid.finance?showFaucet=true"
                target="_blank"
              >
                Superfluid
              </a>
              &nbsp;website to claim faucet and then back.
            </>
          </Tips>
        </div>
      ): (
        <p>
          <b>Note</b>: you need wait <b>12</b> hours to claim again.
        </p>
      )}
    </>
  );
}
