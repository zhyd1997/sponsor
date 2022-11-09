import React, { Dispatch, FC, SetStateAction } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Image from 'next/image';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

type NftProps = {
  /** open */
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  /** nft source */
  nftSrc: string;
  /** nft description */
  nftDescription: string;
};

export const Nft: FC<NftProps> = ({ open, setOpen, nftSrc, nftDescription }) => {
  const handleClose = () => setOpen(false);

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
            <img src={nftSrc} alt={nftDescription} width={"100%"} height={"100%"} />
          </Box>
        </Fade>
      </Modal>
  );
};
