import { ConnectButton } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, useState, FC } from 'react';

import { utils } from "ethers";

import { Framework } from "@superfluid-finance/sdk-core";

import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Alert } from "../Alert";

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
  const [recipient, setRecipient] = useState(addr);
  const [amount, setAmount] = useState('');

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    if (
      typeof Number(value) !== 'number' ||
      isNaN(Number(value)) ||
      Number(value) === 0
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

      const receiver = utils.getAddress(recipient);

      const sf = await Framework.create({
        chainId: chain.id,
        provider,
      });

      const superTokenCls = await sf.loadSuperToken(paymentToken)
      const superToken = superTokenCls.address;

      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate,
        sender,
        receiver,
        superToken,
      });

      toast.info("Waiting User Confirm!");
      await createFlowOperation.exec(signer);
      toast.success(`Sponsor successfully!`);
      setIsSuccess(true);
    } catch (e: any) {
      setIsSuccess(false);
      console.error(e);
      toast.error(`Error: ${e?.message?.split(" (")[0]?.split(" [")[0]}!`);
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
              label="(f)DAIx / month"
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
       {isSuccess && (
         <Alert severity="success">
          Check it out at&nbsp;
          <a href={`https://console.superfluid.finance/${chain?.name}/accounts/${sender}?tab=streams`}>
            Superfluid Console
          </a>.
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
