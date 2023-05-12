import React, { useEffect, useState } from 'react';
import { Button, ButtonProps, Box, SxProps, Stack } from '@mui/material';
import { Field } from './Field';
import { FormField } from 'resources/resources.types';
import { Controller, FieldValues, SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface FormData {
  [key: string]: unknown;
}

interface RenderData {
  [key: string]: JSX.Element;
}

interface FormProps<T extends FieldValues> {
  fields: FormField[];
  actions?: FormAction<T>[];
  data?: T;
  rules?: any;
  handleSubmit?: (data: FieldValues) => void;
  render?: (data: RenderData, actionButtons: JSX.Element[]) => JSX.Element;
}

export interface FormAction<T extends FieldValues> {
  icon: React.ComponentType;
  color: ButtonProps['color'];
  action: SubmitHandler<T>;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  sx?: SxProps;
  disabled?: boolean;
}

function Form<T extends FieldValues>(props: FormProps<T>) {
  const {
    fields,
    rules,
    actions = [],
    data: defaultValues,
    handleSubmit: customSubmitHandler,
    render
  } = props;

  const [defaultData, setDefaultData] = useState<T | undefined>(defaultValues);

  useEffect(() => {
    setDefaultData(defaultValues);
  }, [defaultValues]);

  const formHook: UseFormProps = {
    defaultValues: defaultData
  };
  if (rules) {
    //formHook.resolver = yupResolver(rules);
  }
  const { handleSubmit, control, reset, getValues } = useForm(formHook);

  const submit = (data: FieldValues) => {
    if (customSubmitHandler) {
      customSubmitHandler(data);
    }
  };

  useEffect(() => {
    if (defaultData) {
      reset(defaultData);
    }
  }, [defaultData, reset]);

  const renderData: RenderData = fields.reduce((result, configField) => {
    const fieldName: string = configField.name;

    const ControllerField = (
      <Controller
        name={fieldName}
        control={control}
        render={({ field, fieldState }) => {
          const { value, onChange } = field;
          const { error } = fieldState;
          const helperText = error && error.message ? error.message : configField.helperText;
          const hasError = error !== undefined;
          const customOnChange = (...event: any[]) => {
            onChange(...event);
            if (configField.onChange) {
              configField.onChange(...event);
            }
          };

          return (
            <Field
              {...configField}
              value={value}
              key={fieldName}
              type={configField.type}
              onChange={customOnChange}
              error={hasError}
              helperText={helperText}
            />
          );
        }}
      />
    );
    result[fieldName] = ControllerField;

    return result;
  }, {} as RenderData);

  const getActionButtons = (actions: FormAction<T>[]) => {
    return actions.map((action, index: number) => {
      const Icon = action.icon;

      const defaultSx = actions.length ? { ml: 1 } : {};
      const sx = { ...defaultSx, ...action.sx };
      let onClick = () => action.action(getValues() as T);

      if (action.type === 'reset') {
        const data = defaultData || {};
        onClick = () => reset(data);
      }
      if (action.type === 'submit') {
        onClick = () => {
          handleSubmit(action.action as SubmitHandler<FieldValues>)();
        };
      }

      return (
        <Button
          key={index}
          onClick={onClick}
          variant="contained"
          color={action.color}
          sx={sx}
          disabled={action.disabled}
          type={action.type}
          startIcon={<Icon />}>
          {action.label}
        </Button>
      );
    });
  };
  const ActionButtons = getActionButtons(actions);

  if (render) return render(renderData, ActionButtons);

  return (
    <>
      {Object.keys(renderData).map((key) => (
        <Box mb={2} key={key}>
          {renderData[key]}
        </Box>
      ))}
      {actions.length ? (
        <Stack direction="row" justifyContent="end">
          {ActionButtons.map((Button, index) => (
            <Box key={index}>{Button}</Box>
          ))}
        </Stack>
      ) : (
        <>
          <Button type="submit" variant="contained" onClick={handleSubmit(submit)} color="primary">
            Save
          </Button>
        </>
      )}

    </>
  );
}

export { Form };
