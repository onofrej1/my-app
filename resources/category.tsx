import { Resource } from './resources.types';
import { object, string } from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const rules = object({
    //employeeId: string().required(),
});

const category: Resource = {
    name: 'Category',
    name_plural: 'Categories',
    model: 'Category',
    resource: 'categories',
    relations: ['posts'],
    menuIcon: '',
    rules,
    filter: [
    ],
    form: [
        { name: 'title', type: 'text', label: 'Title' },
    ],
    list: [
        { name: 'title', header: 'Title' },
    ],
};
export { category };
