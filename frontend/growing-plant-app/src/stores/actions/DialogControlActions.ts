// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DialogControlTypes, LOGIN_DIALOG_VISIBLE, REGISTER_DIALOG_VISIBLE } from '../types/DialogControlTypes';

export const showLoginDialog = (isVisible: boolean): DialogControlTypes => ({
    type: LOGIN_DIALOG_VISIBLE,
    payload: isVisible,
});

export const showRegisterDialog = (isVisible: boolean): DialogControlTypes => ({
    type: REGISTER_DIALOG_VISIBLE,
    payload: isVisible,
});