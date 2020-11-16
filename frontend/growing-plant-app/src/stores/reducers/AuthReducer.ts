/* eslint-disable @typescript-eslint/no-unused-vars */
import { Role } from '../../enums/Role';
import { SnackbarInfo } from '../../interfaces/SnackbarInfo';
import {
    AuthTypes,
    CHECK_AUTH_LOCAL_STORAGE,
    REGISTER, REGISTER_ERROR,
    REGISTER_FETCHING,
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
}

const INITIAL_STATE: AuthReducerState = {
    token: '',
    userId: -1,
    role: Role.NO_AUTH,
    signInMessage: { i18nKeyTitle: '', isShow: false, severity: undefined },
    isSignInFetching: false,
    registerMessage: { i18nKeyTitle: '', isShow: false, severity: undefined },
    isRegisterFetching: false,
};

export const AuthReducer = (state: AuthReducerState = INITIAL_STATE, action: AuthTypes)
: AuthReducerState => {
    switch(action.type) {

        case CHECK_AUTH_LOCAL_STORAGE: {
            return checkAuthLocalStorage(state);
        }

        case SIGN_IN: {
            const { token, userId, role } = action.payload;
            console.log(token, userId, role);

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