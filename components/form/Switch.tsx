import React, { FC } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch as MuiSwitch,
} from '@mui/material';
import { BaseProps } from './Field';
import { SxProps } from '@mui/system';

interface SwitchProps extends BaseProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  wrapperSx?: SxProps;
}

export const Switch: FC<SwitchProps> = (props) => {
  const { name, checked, label, helperText, wrapperSx, onChange } = props;  

  return (
    <FormControl>
      <FormGroup sx={wrapperSx}>
        <FormControlLabel 
          control={<MuiSwitch name={name} checked={checked} onChange={onChange} />} 
          label={label || ''} 
        />

      </FormGroup>    
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
