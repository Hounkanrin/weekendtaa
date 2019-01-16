import { Role } from './role';

export class Person {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: Array<Role>;
}
