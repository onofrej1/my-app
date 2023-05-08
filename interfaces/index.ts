export interface Entity {
  id?: number;
  [key: string]: unknown;
}

/*export interface ManagerNode {
    id: string;
    name: string;
    manager: string;
    children?: ManagerNode[];
}

export interface CostCenter {
    id: number;
    name: string;
    costCenterCd: string;
}

export interface EmploymentType {
    name: string;
    code: string;
}

export interface Permission {
    id: number;
    action: string;
    subject: string;
    fields: string;
    conditions: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: Permission[];
}

export interface User {
    id: number;
    employeeId: string;
    birthDate: string,
    joinDate: string,
    active: boolean,
    firstName: string;
    lastName: string;
    position: string,
    email: string;
    costCenter: CostCenter;
    userLdap?: UserLdap;
    employmentType: EmploymentType;
    permissions: Permission[];
    roles: Role[];
}

interface UserLdap {
    firstName: string;
    lastName: string;
    position?: string;
    phone?: string;
}

export interface EventAttendee {
    id: number;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;    
    eventType: EventType;
    data: EventData[];
    eventAttendees: EventAttendee[];
    canBook: boolean;
    [key: string]: unknown;
}

export interface EventTypeField {
    eventType: EventType;
    eventField: EventField;
    value: string;
}

export interface EventType {
    id: number;
    title: string;
    color: string;
    eventTypeFields: EventTypeField[];
}

export interface EventField {
    id: number;
    title: string;
    input: string;
    options: string;
    type: string;
}

export interface EventData {
    id: number;
    value: string;
    eventField: EventField;
}

export interface CalendarEvent {
    id: number;
    title: string;
    description: string;
    start: Date;
    end: Date;    
    data: EventData[];
    attendees: EventAttendee[];
    eventType: EventType;
    canBook: boolean;
    color: string;    
}*/
