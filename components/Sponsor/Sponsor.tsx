import { ConnectButton } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, useState, FC } from 'react';

import { ethers, utils } from "ethers";

import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Alert } from "@/components/Alert";
import { createSfFramework, sfNetwork } from '@/utils/network';
import { Faucet } from '@/components/Faucet';

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
  const [recipient, setRecipient] = useState(addr.trim());
  const [amount, setAmount] = useState('');

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    if (
      typeof Number(value) !== 'number' ||
      isNaN(Number(value))
    ) {
      return;
    }
    setAmount(value);
  }

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

      const sf = await createSfFramework(provider, chain.id);

      const superTokenCls = await sf.loadSuperToken(paymentToken)
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
      await createFlowOperation.exec(signer);
      toast.success(`Sponsor successfully!`);
      setIsSuccess(true);
    } catch (e: any) {
      setIsSuccess(false);
      console.error(e);
      toast.error(e?.reason ?? e?.message?.split(" (")[0]?.split(" [")[0]);
    }

    setIsLoading(false);
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
          <div>
            <TextField
              required
              id="outlined-required"
              label="Wallet Address"
              value={recipient}
              onChange={(evt) => { setRecipient(evt.target.value.trim()) }}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label={`${chain?.testnet ? "fDAIx" : "DAIx"} / month`}
              placeholder="0"
              value={amount}
              onChange={onChange}
            />
          </div>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!recipient || !amount || isLoading}
            onClick={sponsor}
          >
            Send
        </Button>
        <br />
       {chain && isSuccess && (
         <Alert severity="success">
          Check it out at&nbsp;
          <a
            href={`https://console.superfluid.finance/${sfNetwork[chain.network]}/accounts/${sender}?tab=streams`}
            target="_blank"
          >
            Superfluid Console
          </a>.
       </Alert>
       )}
        <br/>
        {
          (chain && chain.testnet) ? 
            (provider && signer && (<Faucet provider={provider} signer={signer} chainId={chain.id} /> )) :
            (
            <p>
              No enough <b>DAIx</b>?
              <br />
              Wrapp some <b>DAI</b> on the&nbsp;
              <a
                href="https://app.superfluid.finance/wrap?upgrade"
                target="_blank"
                style={{ background: "white", padding: "8px", borderRadius: "8px" }}
              >
                Superfluid
              </a>
              &nbsp;page and then back.
            </p>
          )
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
