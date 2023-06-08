import React, { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { BaseProps } from './Field';
import { SxProps } from '@mui/system';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

export interface SelectOption {
  value: "" | string | number;
  text: string;
}

interface SelectProps extends SelectInputProps {
  label?: string;
  error?: boolean;
  placeholder?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: SelectOption[];
}

export const Select: FC<Partial<SelectProps>> = (props) => {
  const {
    value,
    label,
    error,
    helperText,
    fullWidth,
    variant,
    options = []
  } = props;

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      variant={variant}
      size="small"
    >
      {label && <InputLabel id="select-label">{label}</InputLabel>}
      <MuiSelect
        {...props}
        size="small"
        labelId="select-label"
        value={value || ''}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
