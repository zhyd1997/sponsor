import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';

import type { ChainT } from "@/types/index";

type AmountProps = {
  /** chain */
  chain: ChainT;
  /** amount */
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
};

export const Amount: FC<AmountProps> = ({ chain, amount, setAmount }) => {
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

  return (
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
  );
};
