import React, {FC} from 'react';
import {TextField, TextFieldProps} from '@mui/material';
import {Controller, FieldError} from 'react-hook-form';

type InputProps = TextFieldProps & {
  name: string,
  control?: any | undefined,
  errors?: FieldError | undefined
};

const Input: FC<InputProps> = ({name, control, errors, ...props}) => {
  return (
    control
      ? <Controller
          name={name}
          control={control}
          render={({field}) =>
            <TextField
              {...field}
              size="small"
              fullWidth
              sx={{mb: 2}}
              error={!!errors}
              helperText={errors?.message}
              {...props}
            />
          }
        />
      : <TextField
          size="small"
          fullWidth
          sx={{mb: 2}}
          {...props}
        />
  );
};

export default Input;
