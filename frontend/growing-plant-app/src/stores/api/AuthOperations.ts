/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Role } from '../../enums/Role';
import { LoginUser } from '../../interfaces/LoginUser';
import { signInError, signInFetching, signInToReducer } from '../actions/AuthActions';
import { settings } from '../../settings/settings.json';
import { LoginUserToServer } from '../../interfaces/LoginUserToServer';
import { LoginResponse } from '../../interfaces/LoginResponse';

const signInSend = async (user: LoginUser): Promise<LoginResponse> => {
    const { basicUrl, auth } = settings.url;
    const loginUserToServer: LoginUserToServer = { username: user.username, password: user.password };
    const response = await Axios.post(basicUrl + auth, loginUserToServer);

    return response.data as LoginResponse;
};

export const  signIn = (user: LoginUser): ThunkAction<void, {}, {}, AnyAction> => (
    async dispatch => {
        dispatch(signInFetching(true));
        try {
            const loginResponse = await signInSend(user);
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('role', loginResponse.role);
            localStorage.setItem('userId', loginResponse.userId+'');
            dispatch(signInToReducer(loginResponse));
        } catch (e) {
            console.log((e as Error).message);
            dispatch(signInError({ message: (e as Error).message }));
        } finally {
            dispatch(signInFetching(false));
        }
    }
);
