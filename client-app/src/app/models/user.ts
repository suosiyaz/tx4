export interface User {
    userName: string;
    firstName: string;
    token: string;
    userRole: string;
    team: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export class UserDetail {
    firstName: string = '';
    lastName: string = '';
    team: string = '';
    organisation: string = '';
    userRole: string = '';
    isActive: boolean = true;
    email: string = '';
    userName: string = '';
    password?: string = '';
    error?: string = '';
}