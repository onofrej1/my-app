import React, { FC } from 'react';
import { Box, Divider, IconButton, Modal as MuiModal, Paper, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24
};

const titleStyles = {
  fontWeight: 'bold',
  fontSize: '1.3em',
  paddingY: '10px',
  paddingLeft: '15px'
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  keepMounted?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const { open, onClose, title, keepMounted, children } = props;

  return (
    <MuiModal keepMounted={keepMounted} open={open} onClose={onClose}>
      <Paper sx={modalStyles}>
        <Stack direction="row" justifyContent={title ? 'space-between' : 'flex-end'}>
          {title && <Box sx={titleStyles}>{title}</Box>}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack paddingX={2} paddingTop={2} paddingBottom={1}>
          {children}
        </Stack>
      </Paper>
    </MuiModal>
  );
};
