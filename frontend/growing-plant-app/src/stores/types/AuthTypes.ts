/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignInResponse } from '../../interfaces/SignInResponse';
export const CHECK_AUTH_LOCAL_STORAGE = 'AUTH_CHECK_AUTH_LOCAL_STORAGE';
export const SIGN_IN = 'AUTH_SIGN_IN';
export const SIGN_OUT = 'AUTH_SIGN_OUT';


interface CheckAuthLocalStorageAction {
    type: typeof CHECK_AUTH_LOCAL_STORAGE;
}

interface SignInAction {
    type: typeof SIGN_IN;
    payload: SignInResponse;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

export type AuthTypes = CheckAuthLocalStorageAction |
                        SignInAction |
                        SignOutAction;