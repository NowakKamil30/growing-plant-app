/* eslint-disable @typescript-eslint/no-unused-vars */
import Axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LoginUser } from '../../interfaces/LoginUser';
import { activeAccountFetching, activeAccountMessage, activeAccountToReducer, registerFetching, registerMessage, registerToReducer, signInFetching, signInMessage, signInToReducer } from '../actions/AuthActions';
import { settings } from '../../settings/settings.json';
import { LoginUserToServer } from '../../interfaces/LoginUserToServer';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { RegisterUser } from '../../interfaces/RegisterUser';
import { RegisterUserToServer } from '../../interfaces/RegisterUserToServer';
import { ActiveAccountResponse } from '../../interfaces/ActiveAccountResponse';

const signInSend = async (user: LoginUser): Promise<LoginResponse> => {
    const { basicUrl, auth } = settings.url;
    if (user.isSave) {
        localStorage.setItem('username', user.username);
    } else {
        localStorage.removeItem('username');
    }
    const loginUserToServer: LoginUserToServer = { username: user.username, password: user.password };
    const response = await Axios.post(basicUrl + auth, loginUserToServer);

    return response.data as LoginResponse;
};

const registerSend = async (registerUser: RegisterUser): Promise<number> => {
    const { basicUrl, register } = settings.url;
    const registerUserToService: RegisterUserToServer = {
        username: registerUser.usernameRegister,
        password: registerUser.passwordRegister,
        user: {
            firstName: registerUser.firstNameRegister,
            lastName: registerUser.lastNameRegister,
            email: registerUser.emailRegister
        },
    };
    const response = await Axios.post(basicUrl + register, registerUserToService);

    return response.status;
};

const activeAccountSend = async (token: string): Promise<ActiveAccountResponse> => {
    const { basicUrl, verifyToken } = settings.url;
    const response = await Axios.get(basicUrl + verifyToken + '?token=' + token);

    return response.data as ActiveAccountResponse;
}

export const  signIn = (
    user: LoginUser,
    successAction?: () => void,
    errorAction?: () => void
    ): ThunkAction<void, {}, {}, AnyAction> => (
    async dispatch => {
        dispatch(signInFetching(true));
        try {
            const loginResponse = await signInSend(user);
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('role', loginResponse.role);
            localStorage.setItem('userId', loginResponse.userId+'');
            dispatch(signInToReducer(loginResponse));
            successAction && successAction();
        } catch (e) {
            console.log((e as Error).message);
            dispatch(signInMessage({
                i18nKeyTitle: 'errors.loginDefault',
                isShow: true,
                severity: 'error'
            }));
            errorAction && errorAction();
        } finally {
            dispatch(signInFetching(false));
        }
    }
);

export const register = (
    registerUser: RegisterUser,
    successAction?: () => void,
    errorAction?: () => void): ThunkAction<void, {}, {}, AnyAction> => (
        async dispatch => {
            dispatch(registerFetching(true));
            try {
                const status: number = await registerSend(registerUser);
                dispatch(registerToReducer(true));
                successAction && successAction();
            } catch(e) {
                console.log((e as Error).message);
                dispatch(registerMessage({
                    i18nKeyTitle: 'errors.loginDefault',
                    isShow: true,
                    severity: 'error'
                }));
                errorAction && errorAction();
            } finally {
                dispatch(registerFetching(false));
            }
        }
    );

export const activeAccount = (
    token: string,
    successAction?: () => void,
    errorAction?: () => void): ThunkAction<void, {}, {}, AnyAction> => (
        async dispatch => {
            dispatch(activeAccountFetching(true));
            dispatch(activeAccountToReducer(false));
            try {
                const activeAccountResponse: ActiveAccountResponse = await activeAccountSend(token);
                if (activeAccountResponse.isActive) {
                    dispatch(activeAccountToReducer(true));
                    successAction && successAction();
                } else {
                    errorAction && errorAction();
                }
            } catch(e) {
                console.log((e as Error).message);
                dispatch(activeAccountMessage({
                    i18nKeyTitle: 'errors.activeAccount',
                    isShow: true,
                    severity: 'error'
                }));
                errorAction && errorAction();
            } finally {
                dispatch(activeAccountFetching(false));
            }
        }
    );