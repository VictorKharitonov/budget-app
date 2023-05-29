import React, {FC} from 'react';
import {DatePicker, DatePickerProps, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {Controller, FieldError} from 'react-hook-form';

interface CustomDatePickerProps extends DatePickerProps<any> {
  name: string,
  control: any,
  format: string,
  errors: FieldError | undefined
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({name, control, format, errors, ...props}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            format={format}
            value={dayjs(field.value)}
            onChange={(date) => {
              field.onChange(date);
            }}
            sx={{mb: 2}}
            slotProps={{
              textField: {
                fullWidth: true,
                label: name.replace(name[0], name[0].toUpperCase()),
                size: 'small',
                error: !!errors,
                helperText: errors?.message,
              },
            }}
            {...props}
          />
        </LocalizationProvider>
      )
      }
    />
  );
};

export default CustomDatePicker;
