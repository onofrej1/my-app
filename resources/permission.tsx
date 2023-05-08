import { Resource } from './resources.types';
import { object, string } from 'yup';

const rules = object({
  subject: string().required(),
  action: string().required(),
});

const permission: Resource = {
  name: 'Permission',
  name_plural: 'Permissions',
  menuIcon: '',
  model: 'Permission',
  resource: 'permissions',
  rules,
  filter: [
    { name: 'subject', type: 'text', label: 'Subject' },
    { name: 'action', type: 'text', label: 'Action' },
  ],
  form: [
    { name: 'subject', type: 'text', label: 'Subject' },
    { name: 'action', type: 'text', label: 'Action' },
    { name: 'fields', type: 'text', label: 'Fields' },
    { name: 'conditions', type: 'text', label: 'Conditions' },
  ],
  list: [
    { name: 'id'},
    { name: 'subject' },
    { name: 'action' },
    //{ name: 'fields' },
  ],
};

export { permission };
