/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { AuthTypes, CHECK_AUTH_LOCAL_STORAGE, SIGN_IN, SIGN_IN_ERROR, SIGN_IN_FETCHING, SIGN_OUT } from '../types/AuthTypes';

export const checkAuthLocalStorage = (): AuthTypes => ({
    type: CHECK_AUTH_LOCAL_STORAGE
});

export const signInToReducer = (loginResponse: LoginResponse): AuthTypes => ({
    type: SIGN_IN,
    payload: loginResponse,
});

export const signInFetching = (isFetching: boolean): AuthTypes => ({
    type: SIGN_IN_FETCHING,
    payload: isFetching
});

export const signInMessage = (info: SnackbarInfo): AuthTypes => ({
    type: SIGN_IN_ERROR,
    payload: info
});

export const signOut = (): AuthTypes => ({
    type: SIGN_OUT,
});