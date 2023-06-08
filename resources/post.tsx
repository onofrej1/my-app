import { Resource } from './resources.types';
import { object, string } from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const rules = object({
    //employeeId: string().required(),
});

const post: Resource = {
    name: 'Post',
    name_plural: 'Posts',
    model: 'Post',
    resource: 'posts',
    relations: ['category'],
    canAddItem: false,
    menuIcon: '',
    rules,
    filter: [
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'body', type: 'text', label: 'Body' },
    ],
    form: [
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'body', type: 'text', label: 'Body' },
        {
            name: 'categoryId',
            type: 'foreignKey',
            label: 'Category',
            resource: 'categories',
            valueField: 'id',
            textField: 'title',
        },
    ],
    list: [
        { name: 'title', header: 'Title' },
        { name: 'body', header: 'Body' },
        { name: 'CategoryId', header: 'Category' },
    ],
};
export { post };
