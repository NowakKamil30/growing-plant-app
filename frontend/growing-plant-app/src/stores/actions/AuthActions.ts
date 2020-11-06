/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorFromServer } from '../../interfaces/ErrorFromServer';
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

export const signInError = (error: ErrorFromServer): AuthTypes => ({
    type: SIGN_IN_ERROR,
    payload: error
});

export const signOut = (): AuthTypes => ({
    type: SIGN_OUT,
});