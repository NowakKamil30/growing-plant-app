/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorFromServer } from '../../interfaces/ErrorFromServer';
import { LoginResponse } from '../../interfaces/LoginResponse';
export const CHECK_AUTH_LOCAL_STORAGE = 'AUTH_CHECK_AUTH_LOCAL_STORAGE';
export const SIGN_IN = 'AUTH_SIGN_IN';
export const SIGN_IN_FETCHING = 'AUTH_SIGN_IN_FETCHING';
export const SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';
export const SIGN_OUT = 'AUTH_SIGN_OUT';


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
    payload: ErrorFromServer;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

export type AuthTypes = CheckAuthLocalStorageAction |
                        SignInAction |
                        SignOutAction |
                        SignInFetchingAction |
                        SignInErrorAction;