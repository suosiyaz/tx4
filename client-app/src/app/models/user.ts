export interface User {
    userName: string;
    firstName: string;
    token: string;
    userRole: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}