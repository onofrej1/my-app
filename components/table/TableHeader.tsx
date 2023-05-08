import { Box, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { flexRender } from '@tanstack/react-table';
import { Header } from '@tanstack/table-core';
import { Fragment } from 'react';
import { TableData } from './Table';

interface TableHeaderProps {
  headers: Header<TableData, unknown>[],
  renderFilter?: boolean,  
}

const TableHeader = (props: TableHeaderProps) => {
  const { headers, renderFilter } = props;
  const rowPadding = '8px';

  return (
    <Fragment>
      <TableRow>
        {headers.map((header) => {                    
          const column = header.column;
          const isSorted = column.getIsSorted();
          return (          
            <TableCell             
              key={header.id}
              sx={{ padding: rowPadding }}
              onClick={column.getToggleSortingHandler()}
            >
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}            
              <TableSortLabel active={isSorted !== false} direction={isSorted || 'desc'} />              
            </TableCell>
          );
        })}
        <TableCell sx={{ padding: rowPadding }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', marginRight: 2}}>Actions</Box>
        </TableCell>
      </TableRow>

      {renderFilter && (
        <TableRow>
          {headers.map((column) => {
            /*const origSetFilter = column.setFilter;
            column.setFilter = (props: any) => {
              origSetFilter(props);
              resetPage();
            };*/
            return (
              <th key={'filter' + column.id} align="left">
                <Box mt={1}>
                  <div>{/*column.canFilter ? column.render('Filter') : null*/}</div>
                </Box>
              </th>
            );
          })}
        </TableRow>
      )}
    </Fragment>
  );
};

export { TableHeader };
