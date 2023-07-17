import React, {FC} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {SubmitHandler, UseFormReturn} from 'react-hook-form';
import {EnvelopeItem} from '../../types/envelopes';
import Input from '../ui/input/Input';

interface EnvelopeFormProps {
  envelopeCreateForm:  UseFormReturn<EnvelopeItem, any>,
  createEnvelope: SubmitHandler<EnvelopeItem>,
}

const EnvelopeForm: FC<EnvelopeFormProps> = ({envelopeCreateForm, createEnvelope}) => {
  const {handleSubmit, control, formState: {errors}} = envelopeCreateForm;

  return (
    <Box component="form" onSubmit={handleSubmit(createEnvelope)}>
      <Input
        name="name"
        control={control}
        errors={errors.name}
        autoFocus={true}
        placeholder="Shopping"
        sx={{ mb: 1}}
        autoComplete="off"
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
      >
        <Typography variant="body1">Create</Typography>
      </Button>
    </Box>
  );
};

export default EnvelopeForm;
