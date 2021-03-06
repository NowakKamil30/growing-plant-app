/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ADD_DEVICE_DIALOG_VISIBLE,
    DialogControlTypes,
    LOGIN_DIALOG_VISIBLE,
    REGISTER_DIALOG_VISIBLE,
    RESET_PASSWORD_DIALOG_VISIBLE,
    SUCCESS_REGISTER_DIALOG_VISIBLE,
    SUCCESS_RESET_PASSWORD_DIALOG_VISIBLE
} from '../types/DialogControlTypes';

export const showLoginDialog = (isVisible: boolean): DialogControlTypes => ({
    type: LOGIN_DIALOG_VISIBLE,
    payload: isVisible,
});

export const showRegisterDialog = (isVisible: boolean): DialogControlTypes => ({
    type: REGISTER_DIALOG_VISIBLE,
    payload: isVisible,
});

export const showAddDeviceDialog = (isVisible: boolean): DialogControlTypes => ({
    type: ADD_DEVICE_DIALOG_VISIBLE,
    payload: isVisible,
});

export const showSuccessRegisterDialog = (isVisible: boolean): DialogControlTypes =>({
    type: SUCCESS_REGISTER_DIALOG_VISIBLE,
    payload: isVisible
});

export const showResetPasswordDialog = (isVisible: boolean): DialogControlTypes =>({
    type: RESET_PASSWORD_DIALOG_VISIBLE,
    payload: isVisible
});

export const showSuccessResetPasswordDialog = (isVisible: boolean): DialogControlTypes =>({
    type: SUCCESS_RESET_PASSWORD_DIALOG_VISIBLE,
    payload: isVisible
});