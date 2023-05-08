import React, { FC } from 'react';
import { BaseProps } from './Field';
import { InputProps, SxProps, TextField } from '@mui/material';

interface Props extends BaseProps {
  type?: string;
  min?: number;
  max?: number;
  sx?: SxProps;
  rows?: number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps?: Partial<InputProps>;
}

export const Text: FC<Props> = (props) => {
  const {
    name,
    label,
    value,
    variant = 'outlined',
    fullWidth = true,
    type = 'text',
    error,
    helperText,
    sx,
    min,
    max,
    rows = 1,
    InputProps,
    placeholder = '',
    onChange,
  } = props;  

  const BaseInputProps = {
    inputProps: {
      min,
      max,
    },
  };

  return (
    <TextField
      label={label}
      type={type}
      placeholder={placeholder}
      name={name}
      InputProps={{ ...BaseInputProps, ...InputProps }}
      onChange={onChange}
      size="small"
      value={value || ''}
      variant={variant}
      multiline={rows > 1}
      rows={rows}
      sx={sx}
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
    />
  );
};
