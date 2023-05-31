import React, {FC} from 'react';
import {Button, Box} from '@mui/material';
import Icons from '../ui/Icons';
import Input from "../ui/input/Input";

interface ToolBarProps {
  setModal: (val: boolean) => void,
  searchHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  search: string
}

const ToolBar: FC<ToolBarProps> = ({
    setModal,
    search,
    searchHandleChange,
  }) => {

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
        sx={{ mr: 1}}
        autoComplete="off"
      />
      <Button variant="contained" onClick={() => setModal(true)} size="small">
        <Icons.PostAddIcon/>
      </Button>
    </Box>
  );
};

export default ToolBar;
