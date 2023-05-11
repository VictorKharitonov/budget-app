import React, {FC} from 'react';
import {Button, Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import Icons from '../ui/Icons';

interface toolBarProps {
  setModal: (val: boolean) => void,
  searchHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  search: string
}

const ToolBar: FC<toolBarProps> = ({
    setModal,
    search,
    searchHandleChange,
  }) => {

  return (
    <div>
      <Box
        component="form"
        noValidate
        sx={{
          mb: 1,
          display: 'flex',
          justifyContent: 'space-between'
        }}
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder='Search'
          onChange={searchHandleChange}
          value={search}
          fullWidth
          sx={{
            mr: 1
          }}
        />
        <Button variant="contained" onClick={() => setModal(true)}>
          <Icons.PostAddIcon/>
        </Button>
      </Box>
    </div>
  );
};

export default ToolBar;