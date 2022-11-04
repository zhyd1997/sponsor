import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';

type RecipientProps = {
  /** recipient */
  recipient: string;
  setRecipient: Dispatch<SetStateAction<string>>;
  /** error */
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

export const Recipient: FC<RecipientProps> = ({ recipient, setRecipient, error, setError }) => {
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setRecipient(evt.target.value.trim());
  };

  return (
    <div>
      <TextField
        required
        id="outlined-required"
        label="ENS Name or Wallet Address"
        value={recipient}
        onChange={onChange}
        error={error !== ""}
        helperText={error}
      />
    </div>
  );
};
