import { user } from './user';
import { costCenter } from './cost_center';
import { permission } from './permission';
import { employmentType } from './employment_type';
import { Resource } from './resources.types';
import { role } from './role';
import { eventType } from './event_type';
import { eventField } from './event_field';
import { eventTypeField } from './event_type_field';
import { post } from './post';

const resources: Resource[] = [
    user, 
    costCenter, 
    permission, 
    role, 
    employmentType, 
    eventType, 
    eventField,
    eventTypeField,
    post
];
export { resources };
