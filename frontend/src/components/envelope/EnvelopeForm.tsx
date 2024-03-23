import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EnvelopeItem } from '../../types/envelopes';
import Input from '../ui/input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { envelopeScheme } from '../../validations/envelopeValidation';

interface EnvelopeFormProps {
  envelopes: EnvelopeItem[];
  onSubmit: (data: EnvelopeItem) => Promise<void>;
}

const EnvelopeForm: FC<EnvelopeFormProps> = ({ envelopes, onSubmit }) => {
  const defaultValue: EnvelopeItem = {
    name: '',
    status: 'open'
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<EnvelopeItem>({
    defaultValues: defaultValue,
    resolver: yupResolver(envelopeScheme),
    context: {
      envelopes: envelopes.map((envelope: EnvelopeItem) => envelope.name)
    }
  });

  const handleCreateEnvelope: SubmitHandler<EnvelopeItem> = data => {
    onSubmit(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleCreateEnvelope)}>
      <Input
        name="name"
        control={control}
        errors={errors.name}
        autoFocus={true}
        placeholder="Shopping"
        sx={{ mb: 1 }}
        autoComplete="off"
      />
      <Button fullWidth variant="contained" type="submit">
        <Typography variant="body1">Create</Typography>
      </Button>
    </Box>
  );
};

export default EnvelopeForm;
