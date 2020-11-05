/* eslint-disable @typescript-eslint/no-unused-vars */
import { Role } from '../enums/Role';

export interface SignInResponse {
    token: string;
    role: Role;
    userId: number;
}