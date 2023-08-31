import React, {FC, PropsWithChildren} from 'react';
import {Backdrop, Box, Fade, Modal, Typography} from '@mui/material';
import cl from './scss/CustomModal.module.scss';

interface CustomModalProps extends PropsWithChildren{
  title: string;
  modal: boolean;
  setModal: (val: boolean) => void;
  children: React.ReactNode;
}

const CustomModal: FC<CustomModalProps> = ({title, modal, setModal, children}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={modal}
      onClose={() => setModal(false)}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={modal}>
        <Box className={cl.customModal}>
          <Typography id="transition-modal-title" variant="h6" sx={{mb: 1}} component="h2">
            {title}
          </Typography>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;