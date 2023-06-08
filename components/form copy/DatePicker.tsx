import React, { FC } from 'react';
import { BaseProps } from './Field';
import { SxProps, TextField } from '@mui/material';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props extends BaseProps {
  value: string,
  error: boolean;
  helperText: string;
  onChange: (date: Date | null, event: React.SyntheticEvent<any, Event> | undefined) => void;
  sx?: SxProps;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  dateFormat?: string;
  InputProps?: any; // Pick<TextFieldProps, 'InputProps'>;
}

export const DatePicker: FC<Props> = (props) => {
  const {
    name,
    label,
    value,
    variant = 'outlined',
    fullWidth = true,
    sx,
    InputProps,
    placeholder = '',
    showTimeSelect,
    showTimeSelectOnly,
    dateFormat,
    error,
    helperText,
    onChange,
  } = props;

  const dateValue = value ? new Date(value) : null;

  const Input = React.forwardRef(({ value, onClick, handleChange }: any, ref) => (
    <TextField
      label={label}
      name={name}
      type="text"
      error={error}
      helperText={helperText}
      placeholder={placeholder}      
      InputProps={{ ...InputProps }}
      onChange={handleChange}
      size="small"
      value={value}
      variant={variant}
      sx={sx}
      fullWidth={fullWidth}
      onClick={onClick} 
      inputRef={ref}
    />    
  ));
  Input.displayName = 'DateInput';

  return (
    <ReactDatePicker
      showTimeSelect={showTimeSelect}
      showTimeSelectOnly={showTimeSelectOnly} 
      timeFormat="hh:mm"
      selected={dateValue} 
      onChange={onChange} 
      name={name}
      dateFormat={dateFormat || 'dd/MM/yyyy hh:mm'}
      customInput={<Input />}
    />
  );
};
