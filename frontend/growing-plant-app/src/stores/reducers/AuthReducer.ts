/* eslint-disable @typescript-eslint/no-unused-vars */

import { Role } from '../../enums/Role';
import { AuthTypes, CHECK_AUTH_LOCAL_STORAGE } from '../types/AuthTypes';

export interface AuthReducerState {
    token: string;
    role: Role;
}

const INITIAL_STATE: AuthReducerState = {
    token: '',
    role: Role.USER,
};

export const AuthReducer = (state: AuthReducerState = INITIAL_STATE, action: AuthTypes)
: AuthReducerState => {
    switch(action.type) {

        case CHECK_AUTH_LOCAL_STORAGE: {
            return checkAuthLocalStorage(state);
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
            return { ...state, role, token };
        }
    }

    return state;
};