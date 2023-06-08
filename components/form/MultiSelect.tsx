import React, { FC } from 'react';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { BaseProps } from './Field';
import { SxProps } from '@mui/system';

export interface MultiSelectOption {
  value: "" | string;
  text: string;
}

interface MultiSelectProps extends Omit<BaseProps, 'value'> {
  value: "" | string[] | undefined;
  onChange: (event: SelectChangeEvent<string[]>, child: React.ReactNode) => void;
  onSelectAll?: (selectedAll: boolean) => void;
  options: MultiSelectOption[];
  sx?: SxProps;
}

export const MultiSelect: FC<MultiSelectProps> = (props) => {
  const {
    value = [],
    label,
    error,
    helperText,
    variant = 'outlined',
    options = [],
  } = props;

  const isAllSelected = options.length > 0 && value.length === options.length;

  const renderValue = (selected: string[]) => {
    return options.filter(o => o.value && selected.includes(o.value.toString())).map(o => o.text).join(', ');
  };

  const isChecked = (option: MultiSelectOption) => {
    return value.includes(option.value.toString());
  }

  return (
    <FormControl
      size="small"
      error={error}
      variant={variant}>
      {label && <InputLabel id="select-label">{label}</InputLabel>}
      <Select
        {...props}
        size="small"
        labelId="select-label"
        multiple
        renderValue={renderValue}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? 'selectAll' : '',
          }}
        >
          <ListItemIcon>
            <Checkbox
              checked={isAllSelected}
              indeterminate={
                value.length > 0 && value.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText primary="Select All" />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value.toString()}>
            <ListItemIcon>
              <Checkbox checked={isChecked(option)} />
            </ListItemIcon>
            <ListItemText primary={option.text} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
