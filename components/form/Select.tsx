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

export interface SelectOption {
  value: "" | string | number;
  text: string;
}

interface SelectProps extends BaseProps {
  options: SelectOption[];  
  value: string | number | undefined;
  onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void;
  multiple?: boolean;
  autoWidth?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  wrapperSx?: SxProps;
}

export const Select: FC<SelectProps> = (props) => {
  const { 
    name, 
    value, 
    label, 
    error, 
    helperText, 
    autoWidth = false,
    fullWidth = true, 
    variant = 'outlined',
    sx, 
    wrapperSx, 
    onChange, 
    options = [] 
  } = props;

  return (
    <FormControl      
      fullWidth={fullWidth} 
      sx={{ ...wrapperSx }} 
      error={error} 
      variant={variant}
      size="small"
      >
      {label && <InputLabel id="select-label">{label}</InputLabel>}
      <MuiSelect        
        size="small"
        id={name}
        labelId="select-label"
        name={name}
        value={value || ''}
        label={label}
        autoWidth={autoWidth}
        onChange={onChange}
        sx={{ minWidth: 180, ...sx }}
        //displayEmpty={true}
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
