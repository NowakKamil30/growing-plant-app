/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { RegisterUser } from '../../interfaces/RegisterUser';
export const CHECK_AUTH_LOCAL_STORAGE = 'AUTH_CHECK_AUTH_LOCAL_STORAGE';
export const SIGN_IN = 'AUTH_SIGN_IN';
export const SIGN_IN_FETCHING = 'AUTH_SIGN_IN_FETCHING';
export const SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';
export const SIGN_OUT = 'AUTH_SIGN_OUT';
export const REGISTER = 'AUTH_REGISTER';
export const REGISTER_FETCHING = 'AUTH_REGISTER_FETCHING';
export const REGISTER_ERROR = 'AUTH_REGISTER_ERROR';


interface CheckAuthLocalStorageAction {
    type: typeof CHECK_AUTH_LOCAL_STORAGE;
}

interface SignInAction {
    type: typeof SIGN_IN;
    payload: LoginResponse;
}

interface SignInFetchingAction {
    type: typeof SIGN_IN_FETCHING;
    payload: boolean;
}

interface SignInErrorAction {
    type: typeof SIGN_IN_ERROR;
    payload: SnackbarInfo;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface RegisterAction {
    type: typeof REGISTER;
    payload: boolean;
}

interface RegisterFetchingAction {
    type: typeof REGISTER_FETCHING;
    payload: boolean;
}

interface RegisterErrorAction {
    type: typeof REGISTER_ERROR;
    payload: SnackbarInfo;
}


export type AuthTypes = CheckAuthLocalStorageAction |
                        SignInAction |
                        SignOutAction |
                        SignInFetchingAction |
                        SignInErrorAction |
                        RegisterAction |
                        RegisterFetchingAction |
                        RegisterErrorAction;