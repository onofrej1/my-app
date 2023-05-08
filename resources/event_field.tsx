import { object, string, number } from 'yup';
import { Resource } from './resources.types';

const rules = object({
  id: number().notRequired(),
  input: string().required(),
  title: string().required(),
  options: string().notRequired().test(
    'isJson',
    'Invallid json',
    (value) => {
      if (!value) return true;
      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    }
  )
});

const eventField: Resource = {
  name: 'Event field',
  name_plural: 'Event fields',
  model: 'EventField',
  resource: 'eventFields',
  menuIcon: '',  
  filter: [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'input', type: 'text', label: 'Field' },
  ],
  rules,
  form: [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'input', type: 'select', helperText: 'Select widget type used for rendering', label: 'Field', options: [
      { value: 'text', text: 'Text' },
      { value: 'switch', text: 'Boolean' },
      { value: 'select', text: 'Select' },
      { value: 'date', text: 'Date' }
    ] },
    { name: 'type', type: 'select', value: 'info', label: 'Type', options: [
      { value: 'data', text: 'Data field (default)' },
      { value: 'max_attendees', text: 'Max attendees restriction' },
      { value: 'max_frequency', text: 'Max frequency restriction' }
    ]},
    { name: 'options', type: 'text', label: 'Options', rows: 5, helperText: 'Add options, see https://mui.com for more info' },
  ],
  list: [
    { name: 'title', header: 'Title' },
    { name: 'input', header: 'Field' },    
  ],
};
export { eventField };
