'use client';
import React, { FC } from 'react';
import { Form as AdminForm, FormAction } from 'components/form/Form';
import { useEffect, useState } from 'react';
import { resources } from 'resources/index';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { FormField } from 'resources/resources.types';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';
import { FormData } from 'components/form/Form';
import { Entity } from 'interfaces';
//import { ResourcesAction, ResourcesState } from './Resources';
import { ResourcesAction, ResourcesState } from 'app/admin/resources/[resource]/page';
import { SelectOption } from 'resources/resources.types';
import useSWRMutation from 'swr/mutation';
import { argFetcher } from 'utils';

interface Props {
  resource: ResourcesState;
  dispatch: React.Dispatch<ResourcesAction>;
}

const getSelectOptions = (field: FormField, data: Entity[]) => {
  const textField = field.textField;
  const valueField = field.valueField;
  if (!textField || !valueField) {
    return [];
  }
  const options: SelectOption[] = data.map((option) => {
    const text = field.render
      ? field.render(option)
      : option[textField];
    const value = option[valueField] as string;
    return { text, value };
  });
  //options.unshift({ text: '--Choose--', value: null });

  return options;
};

export const Form: FC<Props> = (props) => {
  const { resource, dispatch } = props;
  const [fields, setFields] = useState<FormField[]>([]);
  const [data, setData] = useState<FormData>();
  const { trigger, error } = useSWRMutation(`/api/resources/`, argFetcher);

  const config = resources.find(r => r.resource === resource.name);
  if (!config) {
    throw 'Missing resource configuration.';
  }
  const formConfig = config.form;

  useEffect(() => {
    async function getData() {
      const resp = await trigger({ path: `${resource.name}/${resource.rowId}` });
      const data = await resp?.json();
      //const data = await get(url);

      Object.keys(data).forEach((key: string) => {
        const value = data[key];
        if (Array.isArray(value) && value.length && value[0].id) {
          data[key] = value.map((v) => v.id.toString());
        }
        if (!Array.isArray(value) && value?.id) {
          data[key] = value.id;
        }
      });
      setData(data);
    }

    async function setFormFields() {
      for (const field of formConfig) {
        field.fullWidth = true;
        if (
          ['foreignKey', 'many2many'].includes(field.type) &&
          field.resource
        ) {
          const resp = await trigger({ path: `${field.resource}` });
          const data = await resp?.json();
          field.options = getSelectOptions(field, data.results);
        }
      }
      setFields(formConfig);
    }
    if (resource.rowId) {
      getData();
    } else {
      setData({} as FormData);
    }
    setFormFields();
  }, [formConfig, trigger, resource.name, resource.rowId]);

  const saveData = async (data: FormData) => {
    const path = `${resource.name}/`;
    if (data.id) {
      await trigger({ path: path + data.id, method: 'PATCH', data });
    } else {
      await trigger({ path, method: 'POST', data });
    }
    error ? toast.error('An error occured.') : toast.success('Changes saved.');
  };

  const actions: FormAction<FormData>[] = [
    {
      label: 'Cancel',
      color: 'secondary',
      icon: CancelIcon,
      action: () => dispatch({ type: 'showList' }),
    },
    {
      label: 'Save',
      icon: SaveIcon,
      color: 'primary',
      type: 'submit',
      action: saveData,
    },
    {
      label: 'Save & close',
      icon: CheckCircleIcon,
      color: 'primary',
      type: 'submit',
      action: async (formData) => {
        await saveData(formData);
        dispatch({ type: 'showList' });
      },
    }
  ];

  if (error) return <>{error}</>;

  const title = data && data.id ? `Edit ${config.name}` : `Add new ${config.name}`;
  const formWrapperStyles = { px: 2, maxWidth: '600px', marginX: 'auto', backgroundColor: 'white' };

  return (
    <Box p={2}>
      <Card sx={formWrapperStyles}>
        <CardHeader component={Typography} title={data ? title : ''} />
        <CardContent sx={{ py: 0 }}>
          <AdminForm<FormData>
            fields={fields}
            actions={actions}
            data={data}
            rules={config.rules}
          ></AdminForm>
        </CardContent>
      </Card>
    </Box>
  );
};
