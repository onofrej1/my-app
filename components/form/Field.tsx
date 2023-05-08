import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { Text } from './Text';
import { DatePicker } from './DatePicker';
import { Switch } from './Switch';

export interface BaseProps {
  id?: string;
  name?: string;
  label?: string;
  error?: boolean;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  fullWidth?: boolean;
}

interface FieldProps extends BaseProps {
  value: string | Date;
  type: string;
  required?: boolean;
  multiple?: boolean;
  inputType?: string;
  checked?: boolean;
  onChange: (...event: string[]) => void;
}

export const Field: FC<FieldProps> = (props) => {
  const { name, label, type, error, required, helperText, inputType, ...rest } = props;
  const { value } = props;

  const componentProps = {
    name,
    label,
    type,
    required,
    helperText,
    error,
    inputType,    
    ...rest,
    value,
  };
  if (type === 'many2many' || type === 'multiSelect') {
    componentProps.multiple = true;
  }

  if (type === 'switch') {
    componentProps.checked = !!value;
  }

  if (inputType) {
    componentProps.type = inputType;
  }

  const components: Record<string, React.ElementType> = {
    text: Text,
    switch: Switch,
    date: DatePicker,
    select: Select,
    multiSelect: MultiSelect,
    foreignKey: Select,    
    many2many: MultiSelect,    
  };

  const Component = components[type];

  return (
    <Box>
      {<Component {...componentProps} />}
    </Box>
  );
};
