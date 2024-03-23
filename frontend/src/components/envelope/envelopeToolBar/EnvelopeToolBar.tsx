import React, { FC } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import Icons from '../../ui/Icons';
import Input from '../../ui/input/Input';

interface EnvelopeToolBarProps {
  createEnvelopeLoading: boolean;
  setModal: (val: boolean) => void;
  searchHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const EnvelopeToolBar: FC<EnvelopeToolBarProps> = ({ createEnvelopeLoading, setModal, search, searchHandleChange }) => {
  return (
    <Box
      component="form"
      sx={{
        mb: 1,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Input
        name="search"
        placeholder="Search"
        onChange={searchHandleChange}
        value={search}
        sx={{ mr: 1 }}
        autoComplete="off"
      />
      <Button variant="contained" disabled={createEnvelopeLoading} onClick={() => setModal(true)} size="small">
        {createEnvelopeLoading ? <CircularProgress color="primary" size={24} /> : <Icons.PostAddIcon />}
      </Button>
    </Box>
  );
};

export default EnvelopeToolBar;
