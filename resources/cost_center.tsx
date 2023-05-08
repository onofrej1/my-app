import { Resource } from './resources.types';
import { object, string } from 'yup';

const rules = object({
  name: string().required(),
  costCenterCd: string().required(),
});

const costCenter: Resource = {
  name: 'Cost center',
  name_plural: 'Cost centers',
  menuIcon: '',
  model: 'CostCenter',
  resource: 'cost_centers',
  rules,
  filter: [
    { name: 'costCenterCd', type: 'text', label: 'Cost center' },
    { name: 'name', type: 'text', label: 'Name' },
  ],
  form: [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'costCenterCd', type: 'text', label: 'Cost center' },
  ],
  list: [
    { name: 'id'},
    { name: 'name' },
    { name: 'costCenterCd', header: 'Cost center' },
  ],
};

export { costCenter };
