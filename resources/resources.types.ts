import { CellContext } from '@tanstack/table-core';
import { TableData } from 'components/table/Table';
import { ObjectSchema } from 'yup';

interface SelectOption {
  text: string;
  value: string | number | null | undefined;
}

interface FormField {
    // mandatory props
    name: string;
    label: string;
    type: string;

    // optional props
    value?: string;
    helperText?: string;
    rows?: number;    
    options?: SelectOption[];
    render?: any;
    color?: string;
    inputType?: string;
    fullWidth?: boolean;
    onChange?: any;

    // optional resource options (foreign key, many to many)
    resource?: string;
    textField?: string;
    valueField?: string;
    
    // DatePicker
    showTimeSelect?: boolean;
    showTimeSelectOnly?: boolean;
    dateFormat?: string;
}

interface TableField {
    name: string;
    header?: string | JSX.Element;    
    cell?: (info: CellContext<TableData, unknown>) => JSX.Element,    
}

interface DataFilter {
  name: string;
  type: string;
  label: string;
  options?: SelectOption[];
}

type Resource = {
    name: string;
    name_plural: string;
    model: string;
    resource: string;
    relations?: string[];
    search?: string[];
    rules?: ObjectSchema<any>;
    menuIcon: string;
    form: FormField[];
    list: TableField[];
    filter: DataFilter[];
    filterPosition?: 'table' | 'toolbar';
    canAddItem?: boolean;
    canEditItem?: boolean;
}

export type { Resource, DataFilter, TableField, FormField, SelectOption };
