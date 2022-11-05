import { ConnectButton } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState, FC } from 'react';

import { ethers, utils } from "ethers";

import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import dynamic from "next/dynamic";

import { Recipient } from "@/components/Recipient";
import { createSfFramework } from "@/utils/createSfFramework";
import { sfNetwork } from '@/constants/network';

const Amount = dynamic(() => import("@/components/Amount").then((mod) => mod.Amount));
const TransactionHashLink = dynamic(
  () => import("@/components/TransactionHashLink").then((mod) => mod.TransactionHashLink)
);
const Alert = dynamic(() => import("@/components/Alert").then((mod) => mod.Alert));
const Faucet = dynamic(() => import("@/components/Faucet").then((mod) => mod.Faucet));
const Tips = dynamic(() => import("@/components/Tips").then((mod) => mod.Tips));
const ERC20 = dynamic(() => import("@/components/ERC20").then((mod) => mod.ERC20));

type SponsorProps = {
  /** receipient address */
  addr?: string;
};

export const Sponsor: FC<SponsorProps> = ({ addr = "" }) => {
  const { chain } = useNetwork();
  const provider = useProvider();
  const { address: sender } = useAccount();
  const { data: signer } = useSigner();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [recipient, setRecipient] = useState(addr.trim());
  const [amount, setAmount] = useState('');

  const [txnHash, setTxnHash] = useState("");

  const sponsor = async () => {
    if (!chain || !sender || !signer) {
      return;
    }
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const paymentToken = chain.testnet ? "fDAIx" : "DAIx";
      const monthlyAmount = utils.parseEther(amount);
      const flowRate = monthlyAmount.div(60 * 60 * 24 * 30).toString();

      let receiver;

      if (recipient.endsWith(".eth")) {
        toast.info("Resolving ENS name...");
        const infuraProvider = new ethers.providers.InfuraProvider();
        receiver = await infuraProvider.resolveName(recipient);
        if (!receiver) {
          throw new Error("can not find valid address of associated ENS name!");
        } else {
          toast.success(`Associated wallet address is ${receiver}`);
        }
      } else {
        receiver = utils.getAddress(recipient);
      }

      if (receiver === sender) {
        setError("Uhh, you can not sponsor yourself, try another wallet address!");
        return;
      }

      const sf = await createSfFramework(provider, chain.id);

      const superTokenCls = await sf.loadSuperToken(paymentToken);
      const superToken = superTokenCls.address;

      const userData = utils.defaultAbiCoder.encode(['string'], ['zhyd1997.eth']);

      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate,
        sender,
        receiver,
        superToken,
        userData,
      });

      toast.info("Waiting for user's operations...");
      const res = await createFlowOperation.exec(signer);
      const txn = await res.wait();
      toast.success(`Sponsor successfully!`);
      setTxnHash(txn.transactionHash);
      setIsSuccess(true);
    } catch (e: any) {
      setIsSuccess(false);
      console.error(e);
      toast.error(e?.error?.reason ?? e?.reason ?? e?.message?.split(" (")[0]?.split(" [")[0]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div>
        <ConnectButton />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '32ch' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          noValidate
          autoComplete="off"
        >
          <Recipient recipient={recipient} error={error} setRecipient={setRecipient} setError={setError} />
          {chain && (<Amount chain={chain} amount={amount} setAmount={setAmount} />)}
          {isLoading ? (
            <LoadingButton variant="contained" loading>
              Send
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!recipient || !amount || error !== ""}
              onClick={sponsor}
            >
              Send
            </Button>
          )}
        <br />
       {chain && isSuccess && (
         <Alert severity="success">
            Check it out at&nbsp;
            <a
              href={`https://console.superfluid.finance/${sfNetwork[chain.network]}/accounts/${sender}?tab=streams`}
              target="_blank"
            >
              Superfluid Console
            </a>
            <br />
            <TransactionHashLink chain={chain} txnHash={txnHash} />
        </Alert>
       )}
       <br />
       <Alert severity="warning">
          Note: You can cancel your sponsor on&nbsp;
          <a href="https://app.superfluid.finance/" target="_blank">
            Superfluid DApp
          </a>
          &nbsp;at any time.
       </Alert>
        <br />
        {chain && !chain.testnet && sender && (
          <ERC20 chain={chain} account={sender} />
        )}
        <br/>
        {
          (chain && chain.testnet) ? 
            (provider && signer && (<Faucet provider={provider} signer={signer} chainId={chain.id} /> )) :
            chain ?
            (
              <Tips />
            ) : null
        }
        </Box>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />  
    </>
  )
};
