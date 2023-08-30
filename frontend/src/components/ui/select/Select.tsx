import React, {FC} from 'react';
import {MenuItem, TextField, TextFieldProps} from '@mui/material';
import {Controller, FieldError, Merge} from 'react-hook-form';

type SelectProps = TextFieldProps & {
  name: string;
  control?: any;
  multiple?: boolean;
  options: string[];
  errors?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
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
    control
    ? <Controller
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
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      }
    />
    : <TextField
        fullWidth
        sx={{mb: 2}}
        select
        SelectProps={{
          multiple: multiple,
        }}
        size="small"
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={name}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </TextField>
  );
};

export default Select;
