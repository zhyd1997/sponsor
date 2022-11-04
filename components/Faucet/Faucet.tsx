import { faucetABI, faucetGoerliAddress } from '@/abi/index';
import type { Provider, Signer } from '@/types/index';
import Button from '@mui/material/Button';
import { ethers } from 'ethers';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { chain } from 'wagmi';

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

  const getFaucet = async () => {
    setIsLoading(true);

    try {
      toast.info("Waiting for user's operations...");
      const faucetContract = new ethers.Contract(faucetGoerliAddress, faucetABI, provider);

      await faucetContract.connect(signer).tapFaucet();
      toast.success("Claimed successfully!");
    } catch (e: any) {
      toast.error(e?.reason ?? e?.message?.split(" (")[0]?.split(" [")[0]);
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
      <p>
        <b>Note</b>: you need wait <b>12</b> hours to claim again.
      </p>
    </>
  );
}
