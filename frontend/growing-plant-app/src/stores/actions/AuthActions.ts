/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { LoginResponse } from '../../interfaces/LoginResponse';
import {
    ACTIVE_ACCOUNT,
    ACTIVE_ACCOUNT_ERROR,
    ACTIVE_ACCOUNT_FETCHING,
    AuthTypes,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_FETCHING,
    CHECK_AUTH_LOCAL_STORAGE,
    REGISTER, REGISTER_ERROR,
    REGISTER_FETCHING,
    RESET_PASSWORD,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_FETCHING,
    SIGN_IN,
    SIGN_IN_ERROR,
    SIGN_IN_FETCHING,
    SIGN_OUT
} from '../types/AuthTypes';
import { RegisterUser } from '../../interfaces/RegisterUser';

export const checkAuthLocalStorage = (): AuthTypes => ({
    type: CHECK_AUTH_LOCAL_STORAGE,
});

export const signInToReducer = (loginResponse: LoginResponse): AuthTypes => ({
    type: SIGN_IN,
    payload: loginResponse,
});

export const signInFetching = (isFetching: boolean): AuthTypes => ({
    type: SIGN_IN_FETCHING,
    payload: isFetching,
});

export const signInMessage = (info: SnackbarInfo): AuthTypes => ({
    type: SIGN_IN_ERROR,
    payload: info,
});

export const signOut = (): AuthTypes => ({
    type: SIGN_OUT,
});

export const registerToReducer = (isRegisterCorrect: boolean): AuthTypes => ({
    type: REGISTER,
    payload: isRegisterCorrect,
});

export const registerFetching = (isFetching: boolean): AuthTypes => ({
    type: REGISTER_FETCHING,
    payload: isFetching,
});

export const registerMessage = (info: SnackbarInfo): AuthTypes => ({
    type: REGISTER_ERROR,
    payload: info,
});

export const activeAccountToReducer = (isActiveCorrect: boolean): AuthTypes => ({
    type: ACTIVE_ACCOUNT,
    payload: isActiveCorrect
});

export const activeAccountFetching = (isFetching: boolean): AuthTypes => ({
    type: ACTIVE_ACCOUNT_FETCHING,
    payload: isFetching,
});

export const activeAccountMessage = (info: SnackbarInfo): AuthTypes => ({
    type: ACTIVE_ACCOUNT_ERROR,
    payload: info,
});

export const resetPasswordToReducer = (isSuccess: boolean) => ({
    type: RESET_PASSWORD,
    payload: isSuccess
});

export const resetPasswordFetching = (isFetching: boolean) => ({
    type: RESET_PASSWORD_FETCHING,
    payload: isFetching
});

export const resetPasswordError = (info: SnackbarInfo): AuthTypes => ({
    type: RESET_PASSWORD_ERROR,
    payload: info
});

export const changePasswordToReducer = (isSuccess: boolean) => ({
    type: CHANGE_PASSWORD,
    payload: isSuccess
});

export const changePasswordFetching = (isFetching: boolean) => ({
    type: CHANGE_PASSWORD_FETCHING,
    payload: isFetching
});

export const changePasswordError = (info: SnackbarInfo): AuthTypes => ({
    type: CHANGE_PASSWORD_ERROR,
    payload: info
});