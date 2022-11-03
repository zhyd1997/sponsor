import { ConnectButton } from '@rainbow-me/rainbowkit';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, useState } from 'react';

export default function Home() {
  const [recipient, setRecipient] = useState('');
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

  return (
    <div>
      <ConnectButton />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '32ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Wallet Address or ENS"
            value={recipient}
            onChange={(evt) => { setRecipient(evt.target.value.trim()) }}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="DAIx / month"
            placeholder="0"
            value={amount}
            onChange={onChange}
          />
        </div>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {}}
        >
          Send
      </Button>
      </Box>
    </div>
  )
}
