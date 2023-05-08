import React, { Dispatch, HTMLProps, useContext, useEffect, useState } from 'react';
import { resources } from 'resources';
import Table, { TableAction, TableBulkAction, TableData } from 'components/table/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ResourcesAction, ResourcesState } from 'app/admin/resources/[resource]/page';
import { Resource } from 'resources/resources.types';
import { toast } from 'react-toastify';
import { useConfirmDialog } from 'components/common/useConfirmDialog';
//import { AbilityContext } from 'context/ability.context';

import { Box } from '@mui/system';
import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ColumnDef, Row } from '@tanstack/table-core';
import { ColumnFiltersState, PaginationState, SortingState, createColumnHelper } from '@tanstack/react-table';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate, rest.checked])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

const getTableColumns = (resource: Resource) => {
    const fields = resource.list;
    if (!fields) {
        throw new Error('Missing resource list view configuration.');
    }
    const columns: ColumnDef<TableData>[] = [];

    const columnHelper = createColumnHelper<TableData>();

    const column = columnHelper.display({
        id: 'select',
        cell: ({ row }) => (
            <div className="px-1">
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            </div>
        ),
        header: ({ table }) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
    });
    columns.push(column);

    fields.forEach((field) => {
        const list = field;
        const { name, header, cell } = list;

        const column = columnHelper.accessor(name, {
            id: name,
            cell: info => cell ? cell(info) : info.getValue(),
            header: () => header || name,
        });
        columns.push(column);
    });
    return columns;
};

interface ListProps {
    resource: ResourcesState;
    dispatch: Dispatch<ResourcesAction>;
}

async function fetchResources(url: string, { arg }: { arg: any }) {
    return await fetch(arg.url, {
        method: 'GET',
        /*headers: {
          Authorization: `Bearer ${arg}`
        }*/
    })
}

export default function List(props: ListProps) {
    const { resource, dispatch } = props;
    const [refreshValue, setRefreshValue] = useState<string>();
    //const { delete: deleteRow, error, get, post } = useFetch();
    //const { delete: deleteRow, error, get, post } = useSWR();
    //const { mutate } = useSWRConfig();
    const { trigger } = useSWRMutation('/api/user', fetchResources);
    const [data, setData] = useState<TableData[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const { ConfirmDialog, confirm } = useConfirmDialog();

    const resourceName = resource.name;
    const config = resources.find((r) => r.resource === resourceName);
    if (!config) {
        throw new Error(`Missing "${resourceName}" resource configuration.`);
    }
    const relations = config.relations;

    useEffect(() => {
        setRefreshValue(new Date().getTime().toString());
    }, [resourceName]);

    const columns = React.useMemo(() => getTableColumns(config), [config]);

    /*const ability = useContext(AbilityContext);
    if (!ability.can('Read', config.model)) {
      //return <Navigate to="/access-denied"></Navigate>;
    }*/

    const permissions = {
        create: true, // ability.can('Create', config.model) && config.canAddItem !== false,
        update: true, // ability.can('Update', config.model),
        delete: true, // ability.can('Delete', config.model),
    };

    const addItem = () => {
        dispatch({ type: 'showForm' });
    };

    const editItem = (row: Row<TableData>) => {
        const rowId = row.original['id'];
        dispatch({ type: 'showForm', rowId });
    };

    const deleteItem = async (row: Row<TableData>) => {
        const rowId = row.original['id'];
        const url = `${resource.name}/${rowId}/`;
        //await deleteRow(url);
        setRefreshValue(new Date().getTime().toString());
        //error ? toast.error('An error occured.') : toast.success('Item was removed.');
    };

    const deleteItems = async (rows: Row<TableData>[]) => {
        const url = `${resource.name}/items/delete`;
        const data = rows.map((r) => parseInt(r.original.id));

        //await post(url, data);
        setRefreshValue(new Date().getTime().toString());
        //error ? toast.error('An error occured.') : toast.success('Items were removed.');
    };

    const checkPermission = (action: TableAction) => {
        if (action.type === 'edit') {
            return permissions.update;
        }
        if (action.type === 'delete') {
            return permissions.delete;
        }
        return false;
    };

    let actions: TableAction[] = [
        {
            label: 'Edit',
            color: 'primary',
            action: editItem,
            icon: EditIcon,
            type: 'edit',
        },
        {
            label: 'Delete',
            color: 'secondary',
            type: 'delete',
            action: async (row: Row<TableData>) => {
                const confirmDelete = await confirm('Delete row ?');
                if (confirmDelete) {
                    deleteItem(row);
                    return true;
                }
                return false;
            },
            icon: DeleteIcon,
        },
    ];
    actions = actions.filter(checkPermission);

    const bulkActions: TableBulkAction[] = [
        {
            label: 'Delete',
            action: async (rows) => {
                const confirmDelete = await confirm('Delete selected rows ?');
                if (confirmDelete) {
                    deleteItems(rows);
                }
            },
        },
    ];

    const filterTypeQuery: Record<string, string> = {
        text: '__contains',
        select: '',
    };

    const onStateChange = async (pagination: PaginationState, sorting: SortingState, globalFilter: string, tableFilters: ColumnFiltersState) => {
        const { id, desc } = sorting[0];
        const perPage = pagination.pageSize;
        const relationsParams = relations?.join(',');
        const fetchUrl = relationsParams ? `/api/resources/${resourceName}?include=${relationsParams}` : `/api/resources/${resourceName}`;

        const separator = fetchUrl?.includes('?') ? '&' : '?';
        const filtersParam = tableFilters.reduce((query: string, field) => {
            const resourceFilter = config.filter.find((f) => f.name === field.id);
            if (!resourceFilter) {
                throw new Error('Filter not found');
            }
            const queryOperator = filterTypeQuery[resourceFilter.type] as string;
            query += `&${field.id}${queryOperator}=${field.value}`;
            return query;
        }, '');

        const search = globalFilter ? `&search=${globalFilter}` : '';
        const searchFields = globalFilter && config.search ? `&searchFields=${config.search.join(',')}` : '';
        const orderByParam = id ? `&order=${desc ? '-' : ''}${id}` : '';

        const url = `${fetchUrl}${separator}page=${pagination.pageIndex}&take=${perPage}${orderByParam}${search}${searchFields}${filtersParam}`;

        //const data = await get(url);
        const resp = await trigger({ url: url });
        const data = await resp?.json();
        console.log(data);
        const pages = data.count && data.count > 0 ? Math.ceil(data.count / perPage) : 1;
        setPageCount(pages);
        if (data.results) {
            setData(data.results);
        }
    };

    console.log(config);
    console.log(data);

    return (
        <>
            {ConfirmDialog}
            <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={1}>
                <Box>
                    <Button disabled={!permissions.create} size="small" variant="contained" onClick={addItem} color="primary">
                        <AddIcon /> Add new item
                    </Button>
                </Box>
                {/* portal element rendered by Table component */}
                <div id="globalSearch"></div>
            </Stack>

            <Table
                key={resourceName}
                columns={columns}
                data={data}
                pageCount={pageCount}
                actions={actions}
                bulkActions={bulkActions}
                onStateChange={onStateChange}
                manualPagination={true}
                manualSorting={true}
                manualFiltering={true}
                refreshValue={refreshValue}
                filters={config.filter}
            />
        </>
    );
}
