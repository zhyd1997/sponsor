import React, { Dispatch, FC, SetStateAction } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

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
            <img src={nftSrc} alt={nftDescription} width={350} height={350} />
          </Box>
        </Fade>
      </Modal>
  );
};
