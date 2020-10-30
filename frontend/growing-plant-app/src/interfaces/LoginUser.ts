/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginUserToServer } from './LoginUserToServer';

export interface LoginUser extends LoginUserToServer {
    isSave: boolean;
}
