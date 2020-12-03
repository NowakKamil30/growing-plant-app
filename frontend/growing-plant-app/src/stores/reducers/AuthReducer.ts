/* eslint-disable @typescript-eslint/no-unused-vars */
import { Role } from '../../enums/Role';
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import {
    ACTIVE_ACCOUNT,
    ACTIVE_ACCOUNT_ERROR,
    ACTIVE_ACCOUNT_FETCHING,
    AuthTypes,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_FETCHING,
    CHECK_AUTH_LOCAL_STORAGE,
    REGISTER_ERROR,
    REGISTER_FETCHING,
    RESET_PASSWORD,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_FETCHING,
    SIGN_IN, SIGN_IN_ERROR,
    SIGN_IN_FETCHING,
    SIGN_OUT
} from '../types/AuthTypes';

export interface AuthReducerState {
    token: string;
    role: Role;
    userId: number;
    signInMessage: SnackbarInfo;
    isSignInFetching: boolean;
    isRegisterFetching: boolean;
    registerMessage: SnackbarInfo;
    activeAccountSuccess: boolean;
    isActiveAccountFetching: boolean;
    activeAccountMessage: SnackbarInfo;
    resetPasswordSuccess: boolean;
    isResetPasswordFetching: boolean;
    resetPasswordMessage: SnackbarInfo;
    changePasswordSuccess: boolean;
    isChangePasswordFetching: boolean;
    chnagePasswordMessage: SnackbarInfo;
}

const INITIAL_STATE: AuthReducerState = {
    token: '',
    userId: -1,
    role: Role.NO_AUTH,
    signInMessage: { i18nKeyTitle: '', isShow: false, severity: undefined },
    isSignInFetching: false,
    registerMessage: { i18nKeyTitle: '', isShow: false, severity: undefined },
    isRegisterFetching: false,
    activeAccountSuccess: false,
    isActiveAccountFetching: false,
    activeAccountMessage: { i18nKeyTitle: '', isShow: false, severity: undefined },
    resetPasswordSuccess: false,
    isResetPasswordFetching: false,
    resetPasswordMessage: { i18nKeyTitle: '', isShow: false, severity: undefined },
    changePasswordSuccess: false,
    isChangePasswordFetching: false,
    chnagePasswordMessage: { i18nKeyTitle: '', isShow: false, severity: undefined }
};

export const AuthReducer = (state: AuthReducerState = INITIAL_STATE, action: AuthTypes)
: AuthReducerState => {
    switch(action.type) {

        case CHECK_AUTH_LOCAL_STORAGE: {
            return checkAuthLocalStorage(state);
        }

        case SIGN_IN: {
            const { token, userId, role } = action.payload;

            return { ...state, token, role, userId };
        }

        case SIGN_IN_FETCHING: {
            return { ...state, isSignInFetching: action.payload };
        }

        case SIGN_IN_ERROR: {
            return { ...state, signInMessage: action.payload };
        }

        case REGISTER_FETCHING: {
            return { ...state, isRegisterFetching: action.payload };
        }

        case REGISTER_ERROR: {
            return { ...state, registerMessage: action.payload };
        }

        case ACTIVE_ACCOUNT_FETCHING: {
            return { ...state, isActiveAccountFetching: action.payload };
        }

        case ACTIVE_ACCOUNT_ERROR: {
            return { ...state, activeAccountMessage: action.payload };
        }

        case ACTIVE_ACCOUNT : {
            return { ...state, activeAccountSuccess: action.payload };
        }

        case RESET_PASSWORD : {
            return {  ...state, resetPasswordSuccess: action.payload };
        }

        case RESET_PASSWORD_FETCHING: {
            return {  ...state, isResetPasswordFetching: action.payload };
        }

        case RESET_PASSWORD_ERROR: {
            return {  ...state, resetPasswordMessage: action.payload };
        }

        case CHANGE_PASSWORD : {
            return {  ...state, changePasswordSuccess: action.payload };
        }

        case CHANGE_PASSWORD_FETCHING: {
            return {  ...state, isChangePasswordFetching: action.payload };
        }

        case CHANGE_PASSWORD_ERROR: {
            return {  ...state, chnagePasswordMessage: action.payload };
        }

        case SIGN_OUT: {
            removeLoginDataFromLocalStorage();

            return INITIAL_STATE;
        }

        default: {
            return state;
        }
    }
};

const checkAuthLocalStorage = (state: AuthReducerState) => {
    const token = localStorage.getItem('token');
    if ( token && token.length > 0) {
        const role = localStorage.getItem('role');
        if (role && (role === Role.ADMIN || role === Role.USER)) {
            const userId: number = Number(localStorage.getItem('userId'));
            if (userId && userId > 0) {
                return { ...state, role, token, userId };
            }
        }
    }

    return state;
};

const removeLoginDataFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
};