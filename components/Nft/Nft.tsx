import React, { Dispatch, FC, SetStateAction } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { getTxnHashLink } from '@/utils/getTxnHashLink';
import type { ChainT } from '@/types/index';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  boxShadow: 24,
  p: 4,
};

type NftProps = {
  /** chain */
  chain: ChainT;
  /** open */
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  /** nft source */
  nftSrc: string;
  /** nft description */
  nftDescription: string;
  /** nft transaction hash */
  nftTxn: string;
};

export const Nft: FC<NftProps> = ({ chain, open, setOpen, nftSrc, nftDescription, nftTxn }) => {
  const handleClose = () => setOpen(false);
  
  const txnHashLink = getTxnHashLink(chain.network, nftTxn);

  return (
      <Modal
        aria-labelledby={nftDescription}
        aria-describedby={nftDescription}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <a href={txnHashLink} target="_blank" rel="noreferrer">
              <img src={nftSrc} alt={nftDescription} width={350} height={350} />
            </a>
          </Box>
        </Fade>
      </Modal>
  );
};
