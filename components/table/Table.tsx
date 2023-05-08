/* eslint react/prop-types: 0 */
import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Table as MuiTable,
  Stack,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
  //ButtonProps,
} from '@mui/material';
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
  PaginationState,
  SortingState,
  Row
} from '@tanstack/react-table';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { TableHeader } from './TableHeader';
import { Pagination } from './Pagination';
import { Text } from 'components/form/Text';
import { useFilter } from './useFilter';
import GetAppIcon from '@mui/icons-material/GetApp';
import { BulkActions } from './BulkActions';
import ReactDOM from 'react-dom';

export interface TableData {
  [key: string]: any;
}

export interface TableAction {
  label: string;
  icon: React.ElementType;
  color: ButtonProps['color'];
  action: (data: Row<TableData>) => void;
  type?: 'edit' | 'delete' | 'info';
}

export interface TableBulkAction {
  label: string;
  action: (data: Row<TableData>[]) => void;
}

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<TableData> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({
    itemRank
  });
  // Return if the item should be filtered in/out
  return itemRank.passed;
};

interface Props {
  columns: ColumnDef<TableData>[];
  data: TableData[];
  pageCount?: number;
  actions?: TableAction[];
  bulkActions?: TableBulkAction[];
  filters: any[];
  onStateChange?: (pagination: PaginationState, sorting: SortingState, globalFilter: string, columnFilters: ColumnFiltersState) => void;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  refreshValue?: string;
}

function DataTable({
  columns,
  data,
  pageCount,
  actions,
  bulkActions,
  filters,
  onStateChange,
  manualPagination = false,
  manualSorting = false,
  manualFiltering = false,
  refreshValue
}: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({})
  const [searchElement, setSearchElement] = useState<HTMLElement>();

  useEffect(() => {
    const searchEl = document.getElementById('globalSearch');
    if (searchEl) {
      setSearchElement(searchEl);
    }
  }, []);

  const tableColumns = useMemo<ColumnDef<TableData>[]>(() => columns, [refreshValue]);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const [sortingState, setSorting] = useState<SortingState>([
    {
      id: 'id',
      desc: false
    }
  ]);

  const sorting = useMemo(() => sortingState, [sortingState]);

  const table = useReactTable({
    data: data,
    pageCount: pageCount,
    columns: tableColumns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      pagination,
      sorting,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination,
    manualSorting,
    manualFiltering
  });
  const columnFiltersState = table.getState().columnFilters;

  useEffect(() => {
    async function fetchData() {
      if (onStateChange) {
        onStateChange(pagination, sortingState, globalFilter, columnFiltersState);
      }
    }
    fetchData();
  }, [pagination, sortingState, globalFilter, columnFiltersState, refreshValue]);

  const rowPadding = '8px';
  const tableCellStyles = { whiteSpace: 'nowrap', padding: 0, textAlign: 'center' };

  const { renderMenu, renderFilter, hasFilters } = useFilter({
    dataFilters: filters,
    headerGroups: table.getHeaderGroups(),
    gotoPage: table.setPageIndex,
    disabled: !!globalFilter,
  });

  const bulkActionOptions = bulkActions ? bulkActions.map((a) => a.label) : [];
  bulkActionOptions.unshift('Select action');

  const selectedRows = Object.keys(rowSelection).length;
  const BulkActionsToolbar = (
    <Stack direction="row" gap={2} alignItems="center">
      <BulkActions
        disabled={selectedRows === 0}
        options={bulkActionOptions}
        onChange={async (value: string) => {
          const bulkAction = bulkActions?.find((a) => a.label === value);
          const actionPerformed = await bulkAction?.action(table.getSelectedRowModel().flatRows);
          if (actionPerformed) {
            table.resetRowSelection();
          }
        }}
      />
      {selectedRows > 0 && <div>{selectedRows} items selected</div>}
    </Stack>
  );

  // don't render global filter (search multiple columns) if table column filter is active
  const searchInput = !hasFilters ? <Text
    value={globalFilter}
    onChange={(e) => {
      setGlobalFilter(e.target.value);
      table.setPageIndex(0);
    }}
    fullWidth={false}
    variant="standard"
    label="Search"
  /> : null;

  return (
    <>
      {/*searchInput && searchElement && ReactDOM.createPortal(searchInput, searchElement)*/}
      <Stack direction="row" justifyContent="space-between">
        <Box>{/*BulkActionsToolbar*/}</Box>
        <Stack alignItems="flex-end">
          <Stack direction="row">
            {renderMenu()}
            <Box sx={{ display: 'flex', padding: 0.8 }}>
              <GetAppIcon color="primary" />
              <Typography component="span" color="primary">
                EXPORT
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ padding: 1 }}>{!globalFilter && renderFilter()}</Box>

      <MuiTable>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <TableHeader headers={headerGroup.headers} key={index} />
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row, index: number) => {
            return (
              <TableRow key={index}>
                {row.getVisibleCells().map((cell, index: number) => {
                  return (
                    <TableCell key={index} sx={{ padding: rowPadding }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
                {actions && <TableCell
                  key={'action_' + index}
                  align='right'
                  sx={{ whiteSpace: 'nowrap', padding: rowPadding }}>
                  {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Box pr={1} key={action.label} sx={{ display: 'inline' }}>
                        <Button
                          onClick={async () => {
                            action.action(row);
                          }}
                          variant="contained"
                          size="small"
                          color={action.color || 'secondary'}>
                          <Icon sx={{ fontSize: '15px', mr: 0.5 }} /> {action.label}
                        </Button>
                      </Box>
                    );
                  })}
                </TableCell>}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell sx={tableCellStyles} colSpan={columns.length + 2}>
              {
                <Pagination
                  gotoPage={table.setPageIndex}
                  nextPage={table.nextPage}
                  previousPage={table.previousPage}
                  canNextPage={table.getCanNextPage()}
                  canPreviousPage={table.getCanPreviousPage()}
                  totalPages={table.getPageCount()}
                  pageSize={table.getState().pagination.pageSize}
                  pageCount={table.getPageCount()}
                  pageIndex={table.getState().pagination.pageIndex}
                  setPageSize={table.setPageSize}
                />
              }
            </TableCell>
          </TableRow>
        </TableFooter>
      </MuiTable>
    </>
  );
}

export default DataTable;
