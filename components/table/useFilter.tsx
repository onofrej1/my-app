import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Stack } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DataFilter } from 'resources/resources.types';
import { Column, HeaderGroup } from '@tanstack/react-table';
import { TableData } from './Table';
import { Text } from 'components/form/Text';
import { Select, SelectOption } from 'components/form/Select';

interface useFilterProps {
  headerGroups: HeaderGroup<TableData>[],
  dataFilters: DataFilter[],
  gotoPage: (page: number) => void,
  disabled: boolean,
}

const useFilter = (props: useFilterProps) => {
  const { dataFilters, headerGroups, gotoPage, disabled = false } = props;
  const [filters, setFilters] = useState<DataFilter[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const addFilter = (filter: DataFilter) => {
    setAnchorEl(null);
    filters.push(filter);
    setFilters(filters);
  };

  const removeFilter = (column: Column<TableData, unknown>) => {
    const newFilters = filters.filter((filter) => filter.name !== column.id);
    column.setFilterValue(undefined);
    setFilters(newFilters);
  };

  const removeFilters = () => {
    setFilters([]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = dataFilters.filter((f) => !filters.includes(f));

  const renderMenu = () => (
    <Box>
      <Button
        disabled={disabled || !menuItems.length}
        onClick={handleClick}
      >
        <FilterListIcon /> Add Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((filter) => {
          return (
            <MenuItem key={filter.name} onClick={() => addFilter(filter)}>
              {filter.label || filter.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );  

  const renderFilter = () => (
    <Box>
      {filters.length > 0 &&
        headerGroups.map((headerGroup, index: number) => ( 
          <Stack direction="row" gap={1} marginTop={1} marginLeft={1} justifyContent="flex-end" key={index}>
            {headerGroup.headers.map((header) => {
              const column = header.column;                                        
              if (!column.getCanFilter() || !filters.map((f) => f.name).includes(column.id)) return null;

              const filter = dataFilters.find((f) => f.name === column.id);              
              const label = filter?.label;
              const origSetFilter = column.setFilterValue;
              column.setFilterValue = (updater: any) => {
                origSetFilter(updater);
                gotoPage(0);
              };

              return (
                <Stack key={column.id} alignItems="center" direction="row" gap={1}>                  
                  {filter?.type === 'text' && <Text
                    value={column.getFilterValue() as string}
                    onChange={(e) => column.setFilterValue(e.target.value)}
                    fullWidth={false}
                    label={label}                    
                    />}
                  {filter?.type === 'select' && filter.options && <Select
                    label={label}
                    value={column.getFilterValue() as string}
                    onChange={(e) => column.setFilterValue(e.target.value)}
                    options={filter.options as SelectOption[]}
                    fullWidth={false}
                    ></Select>}
                    <HighlightOffIcon onClick={() => removeFilter(column)} /> 
                </Stack>
              )})
            }
          </Stack>
        ))
      }
    </Box>
  );

  return { renderMenu, renderFilter, removeFilters, hasFilters: filters.length };
};

export { useFilter };
