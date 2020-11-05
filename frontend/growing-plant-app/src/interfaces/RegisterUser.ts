export interface RegisterUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword?: string;
    isAcceptedDocument?: boolean;
}