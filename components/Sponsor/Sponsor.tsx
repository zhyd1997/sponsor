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

import type { ICreateFlowParams } from '@superfluid-finance/sdk-core';

import { Recipient } from "@/components/Recipient";
import { createSfFramework } from "@/utils/createSfFramework";
import { sfNetwork } from '@/constants/network';
import { tokens } from '@/constants/tokens';
import { T } from '@/types/index';

const Amount = dynamic(() => import("@/components/Amount").then((mod) => mod.Amount));
const TransactionHashLink = dynamic(
  () => import("@/components/TransactionHashLink").then((mod) => mod.TransactionHashLink)
);
const Alert = dynamic(() => import("@/components/Alert").then((mod) => mod.Alert));
const Faucet = dynamic(() => import("@/components/Faucet").then((mod) => mod.Faucet));
const Tips = dynamic(() => import("@/components/Tips").then((mod) => mod.Tips));
const ERC20 = dynamic(() => import("@/components/ERC20").then((mod) => mod.ERC20));
const SuperToken = dynamic(() => import("@/components/SuperToken").then((mod) => mod.SuperToken));

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

  const [currentTab, setCurrentTab] = useState(T.DAIx);

  const sponsor = async () => {
    if (!chain || !sender || !signer) {
      return;
    }
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const paymentToken = chain.testnet ? "fDAIx" : tokens[currentTab].superTokenSymbol;
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

      toast.info("Preparing Superfluid Service...");

      const sf = await createSfFramework(provider, chain.id);

      const superTokenCls = await sf.loadSuperToken(paymentToken);
      const superToken = superTokenCls.address;

      const userData = utils.defaultAbiCoder.encode(['string'], ['zhyd1997.eth']);

      const userFlow = await sf.cfaV1.getFlow({
        superToken,
        sender,
        receiver,
        providerOrSigner: provider,
      });

      let flowOperation;

      const params: ICreateFlowParams = {
        flowRate,
        sender,
        receiver,
        superToken,
        userData,
      };

      if (Number(userFlow.flowRate) !== 0) {
        toast.warn("You have sponsored him / her!\nThe operation will update your sponsoring amount...");
        flowOperation = sf.cfaV1.updateFlow({ ...params });
      } else {
        flowOperation = sf.cfaV1.createFlow({ ...params });
      }

      if (!flowOperation) return;

      toast.info("Waiting for your operations...");
      const res = await flowOperation.exec(signer);
      toast.info("Waiting for Block confirmation...");
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
          {chain && sender && (
            <Amount chain={chain} amount={amount} setAmount={setAmount} currentTab={currentTab} setCurrentTab={setCurrentTab} />
          )}
          {chain && sender && (
            <>
              {
                chain.testnet
                  ?
                    (<SuperToken chain={chain} provider={provider} account={sender} superTokenSymbol={"fDAIx"} />)
                  :
                    tokens.map(({ superTokenSymbol }) =>
                      <SuperToken
                        key={superTokenSymbol}
                        chain={chain}
                        provider={provider}
                        account={sender}
                        superTokenSymbol={superTokenSymbol}
                      />
                    )
                }
            </>
          )}
          <br />
          {isLoading ? (
            <LoadingButton variant="contained" loading>
              Send
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!chain || !recipient || !amount || error !== ""}
              onClick={sponsor}
            >
              Send
            </Button>
          )}
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
                <Tips superToken={tokens[currentTab].superTokenSymbol} token={tokens[currentTab].name} />
              ) : null
          }
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
       {chain && (
        <Alert severity="warning">
          Note: You can cancel your sponsoring on&nbsp;
          <a href="https://app.superfluid.finance/" target="_blank">
            Superfluid DApp
          </a>
          &nbsp;at any time.
      </Alert>
       )}
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
