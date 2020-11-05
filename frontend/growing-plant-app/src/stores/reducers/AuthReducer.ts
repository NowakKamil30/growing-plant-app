/* eslint-disable @typescript-eslint/no-unused-vars */
import { Role } from '../../enums/Role';
import { AuthTypes, CHECK_AUTH_LOCAL_STORAGE, SIGN_IN, SIGN_OUT } from '../types/AuthTypes';

export interface AuthReducerState {
    token: string;
    role: Role;
    userId: number;
}

const INITIAL_STATE: AuthReducerState = {
    token: '',
    userId: -1,
    role: Role.NO_AUTH,
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