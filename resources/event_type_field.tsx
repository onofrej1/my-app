import { Resource } from './resources.types';
import { object, string } from 'yup';

const rules = object({
  value: string().required(),  
});

const eventTypeField: Resource = {
  name: 'Event type field',
  name_plural: 'Event type fields',
  model: 'EventType',
  resource: 'eventTypeFields',
  relations: ['eventType', 'eventField'],
  menuIcon: '',  
  filter: [],
  rules,
  form: [    
    {
        name: 'eventType',
        type: 'foreignKey',
        label: 'Event type',
        resource: 'eventTypes',
        valueField: 'id',
        textField: 'title',
      },
      {
        name: 'eventField',
        type: 'foreignKey',
        label: 'Event field',
        resource: 'eventFields',
        valueField: 'id',
        textField: 'title',
      },
      { name: 'value', type: 'text', label: 'Value' },    
  ],
  list: [
    { 
        name: 'eventType.title', 
        header: 'Event type',
    },
    { 
        name: 'eventField.title', 
        header: 'Event field',
    },
    { name: 'value', header: 'Value' }    
  ],
};
export { eventTypeField };
