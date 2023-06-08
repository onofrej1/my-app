import React, { FC } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch as MuiSwitch,
} from '@mui/material';
import { SxProps } from '@mui/system';

interface SwitchProps {
  label: string;
  helperText: string;
  checked: boolean;
}

export const Switch: FC<SwitchProps> = (props) => {
  const { checked, label, helperText } = props;

  return (
    <FormControl>
      <FormGroup>
        <FormControlLabel
          control={<MuiSwitch {...props} checked={checked} />}
          label={label || ''}
        />
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
