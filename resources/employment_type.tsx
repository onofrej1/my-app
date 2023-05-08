import { Resource } from './resources.types';
import { object, string } from 'yup';

const rules = object({
  name: string().required(),
  code: string().required(),
});

const employmentType: Resource = {
  name: 'Employment type',
  name_plural: 'Employment types',
  menuIcon: '',
  model: 'EmploymentType',
  resource: 'employment_types',
  filter: [],
  rules,
  form: [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'code', type: 'text', label: 'Code' },
  ],
  list: [
    { name: 'id'},
    { name: 'name' },
    { name: 'code' },
  ],
};

export { employmentType };
