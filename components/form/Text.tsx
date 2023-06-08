import React, { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export const Text: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      size="small"
      value={props.value || ''}
    />
  );
};
