import { Resource } from './resources.types';
import { object, string } from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const rules = object({
    employeeId: string().required(),
});

const post: Resource = {
    name: 'Post',
    name_plural: 'Posts',
    model: 'Post',
    resource: 'posts',
    relations: ['author'],
    canAddItem: false,
    menuIcon: '',
    rules,
    filter: [
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'content', type: 'text', label: 'Content' },
    ],
    form: [
        { name: 'title', type: 'text', label: 'Title' },
        { name: 'content', type: 'date', label: 'Content' },
        {
            name: 'user',
            type: 'foreignKey',
            label: 'User',
            resource: 'users',
            valueField: 'id',
            textField: 'name',
        },
    ],
    list: [
        { name: 'title', header: 'Title' },
        {
            name: 'content',
            header: 'Content',
        },
        {
            name: 'user',
            header: 'User',
        },
    ],
};
export { post };
