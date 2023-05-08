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
    name,
    value = [],
    label,
    error,
    helperText,
    variant = 'outlined',
    onChange,
    onSelectAll,
    options = [],
    fullWidth = true,
    sx,
  } = props;

  const isAllSelected = options.length > 0 && value.length === options.length;

  /*const handleChange = (e: SelectChangeEvent<string[]>) => {
    const values = e.target.value;
    if (values[values.length - 1] === 'all') {
      const newValue = value.length === options.length ? [] : options.map(o => o.value);
      onChange(newValue);
      return;
    }
    onChange(values);
  };*/

  const renderValue = (selected: string[]) => {
    return options.filter(o => o.value && selected.includes(o.value.toString())).map(o => o.text).join(', ');
  };

  const handleSelectAllClick = () => {
    const value = isAllSelected ? options.map(o => o.value) : [];    
    //const e = new Event<SelectChangeEvent>();
    if (onSelectAll) onSelectAll(!isAllSelected);
  };  

  const isChecked = (option: MultiSelectOption) => {
    return value.includes(option.value.toString());
  }

  return (
    <FormControl 
      size="small" 
      error={error}
      fullWidth={fullWidth}
      variant={variant}>
      {label && <InputLabel id="select-label">{label}</InputLabel>}
      <Select
        id={name}
        size="small"
        labelId="select-label"        
        multiple
        label={label}
        variant={variant}
        value={value}
        onChange={onChange}
        renderValue={renderValue}        
        sx={{ minWidth: 150, ...sx }}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? 'selectAll' : '',
          }}
        >
          <ListItemIcon>
            <Checkbox
              onClick={handleSelectAllClick}
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
