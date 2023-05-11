import React, {FC} from 'react';
import TextField from '@mui/material/TextField';
import {Box, Button, Typography} from '@mui/material';

interface envelopeFormProps {
  newItem: string,
  newItemHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  createItem: () => void,
  error: boolean
}

const EnvelopeForm: FC<envelopeFormProps> = ({newItem, newItemHandleChange, createItem, error}) => {
  return (
    <Box component="form">
      <TextField
        error={error}
        helperText={error ? 'Field can not be empty' : ''}
        id="envelopeField"
        variant="outlined"
        placeholder='Shopping'
        fullWidth
        sx={{ mb: 1 }}
        value={newItem}
        onChange={newItemHandleChange}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={createItem}
      >
        <Typography variant="body1">Create</Typography>
      </Button>
    </Box>
  );
};

export default EnvelopeForm;