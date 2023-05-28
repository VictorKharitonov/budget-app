import React, {FC} from 'react';
import {MenuItem, TextField, TextFieldProps} from '@mui/material';
import {Controller, FieldError, Merge} from 'react-hook-form';

interface Option {
  id: string | number,
  name: string
}

type SelectProps = TextFieldProps & {
  name: string,
  control: any,
  multiple?: boolean,
  options: Option[]
  errors: Merge<FieldError, (FieldError | undefined)[]> | undefined,
}

const Select: FC<SelectProps> = (
  {
    name,
    control,
    multiple = false,
    errors,
    options = [],
    ...props
  }
) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) =>
        <TextField
          {...field}
          fullWidth
          sx={{mb: 2}}
          select
          SelectProps={{
            multiple: multiple,
          }}
          size="small"
          error={!!errors}
          helperText={errors?.message}
          {...props}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.name}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    />
  );
};

export default Select;
