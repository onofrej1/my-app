import { Resource } from './resources.types';
import { object, string } from 'yup';

const rules = object({
  title: string().required(),
  description: string().required(),
});

const eventType: Resource = {
  name: 'Event type',
  name_plural: 'Event types',
  model: 'EventType',
  resource: 'eventTypes',
  menuIcon: '',
  relations: ['eventTypeFields.eventType', 'eventTypeFields.eventField'],
  filter: [],
  rules,
  form: [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'description', type: 'text', label: 'Description' },
    { name: 'color', type: 'text', label: 'Color' },
  ],
  list: [
    { name: 'title', header: 'Title' },
    { name: 'description', header: 'Description' },
    { name: 'color', header: 'Color' },
  ],
};
export { eventType };
