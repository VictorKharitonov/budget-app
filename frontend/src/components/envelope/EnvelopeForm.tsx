import React, {FC} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {EnvelopeItem} from '../../types/envelopes';
import {envelopeScheme} from '../../validations/envelopeValidation';
import Input from '../ui/input/Input';

interface EnvelopeFormProps {
  envelopes: EnvelopeItem[],
  setEnvelopes: (val: EnvelopeItem[]) => void,
  setEnvelopesModal: (val: boolean) => void,
}

const EnvelopeForm: FC<EnvelopeFormProps> = ({
  envelopes,
  setEnvelopes,
  setEnvelopesModal,
}) => {
  let defaultValue: EnvelopeItem = {
    name: '',
    status: 'open'
  }
  const {handleSubmit, control, reset, formState: {errors}} = useForm<EnvelopeItem>({
    defaultValues: defaultValue,
    resolver: yupResolver(envelopeScheme),
  });

  const createEnvelope: SubmitHandler<EnvelopeItem> = (data: EnvelopeItem) => {
    setEnvelopes([data, ...envelopes]);
    setEnvelopesModal(false);
    reset();
  }

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
