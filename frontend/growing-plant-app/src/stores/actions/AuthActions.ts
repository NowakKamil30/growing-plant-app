/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginUser } from '../../interfaces/LoginUser';
import { SignInResponse } from '../../interfaces/SignInResponse';
import { AuthTypes, CHECK_AUTH_LOCAL_STORAGE, SIGN_IN, SIGN_OUT } from '../types/AuthTypes';

export const checkAuthLocalStorage = (): AuthTypes => ({
    type: CHECK_AUTH_LOCAL_STORAGE
});

export const signInToReducer = (signInResponse: SignInResponse): AuthTypes => ({
    type: SIGN_IN,
    payload: signInResponse,
});

export const signOut = (): AuthTypes => ({
    type: SIGN_OUT,
});