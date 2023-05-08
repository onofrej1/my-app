import { Resource } from './resources.types';
import { object, string } from 'yup';

const rules = object({
  name: string().required(),
  description: string().required(),
});

const role: Resource = {
  name: 'Role',
  name_plural: 'Roles',
  menuIcon: '',
  model: 'Role',
  resource: 'roles',
  rules,
  filter: [],
  form: [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'description', type: 'text', label: 'Description' },
  ],
  list: [
    { name: 'id'},
    { name: 'name' },
    { name: 'description', header: 'Description' },
  ],

};

export { role };
