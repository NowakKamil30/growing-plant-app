/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Role } from '../../enums/Role';
import { LoginUser } from '../../interfaces/LoginUser';
import { SignInResponse } from '../../interfaces/SignInResponse';
import { signInToReducer } from '../actions/AuthActions';

const signInSend = async (user: LoginUser) => {

    return !!user;
};

export const  signIn = (user: LoginUser): ThunkAction<void, {}, {}, AnyAction> => (
    async dispatch => {
        const signInData = await signInSend(user);
        localStorage.setItem('token', '111111');
        localStorage.setItem('role', Role.USER);
        localStorage.setItem('userId', '1');
        dispatch(signInToReducer({token: 'asdsadsa', role: Role.USER, userId: 1} as SignInResponse));
    }
);
