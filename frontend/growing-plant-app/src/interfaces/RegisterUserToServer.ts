export interface RegisterUserToServer {
    username: string;
    password: string;
    user: {
        email: string;
        firstName: string;
        lastName: string;
    };
}