import React, {FC} from 'react';
import {BaseTextFieldProps, styled, TextField, TextFieldProps} from '@mui/material';
import {Controller, FieldError} from 'react-hook-form';

type InputProps = TextFieldProps & {
  name: string,
  control: any,
  errors: FieldError | undefined
};

const Input: FC<InputProps> = ({name, control, errors, ...props}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) =>
        <TextField
          {...field}
          size="small"
          fullWidth
          label={name.replace(name[0], name[0].toUpperCase())}
          sx={{mb: 2}}
          error={!!errors}
          helperText={errors?.message}
          {...props}
        />
      }
    />
  );
};

export default Input;
