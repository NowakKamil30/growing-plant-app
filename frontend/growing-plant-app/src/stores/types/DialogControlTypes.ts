export const LOGIN_DIALOG_VISIBLE = 'DIALOG_CONTROL_LOGIN_DIALOG_VISIBLE';
export const REGISTER_DIALOG_VISIBLE = 'DIALOG_CONTROL_REGISTER_DIALOG_VISIBLE';
export const ADD_DEVICE_DIALOG_VISIBLE = 'DIALOG_CONTROL_ADD_DEVICE_DIALOG_VISIBLE';
export const SUCCESS_REGISTER_DIALOG_VISIBLE = 'DIALOG_CONTROL_SUCCESS_REGISTER_DIALOG_VISIBLE';

interface LoginDialogVisibleAction {
    type: typeof LOGIN_DIALOG_VISIBLE;
    payload: boolean;
}

interface RegisterDialogVisibleAction {
    type: typeof REGISTER_DIALOG_VISIBLE;
    payload: boolean;
}

interface AddDeviceDialogVisibleAction {
    type: typeof ADD_DEVICE_DIALOG_VISIBLE;
    payload: boolean;
}

interface SuccessRegisterDialogVisibleAction {
    type: typeof SUCCESS_REGISTER_DIALOG_VISIBLE;
    payload: boolean;
}

export type DialogControlTypes = LoginDialogVisibleAction |
                                RegisterDialogVisibleAction |
                                AddDeviceDialogVisibleAction |
                                SuccessRegisterDialogVisibleAction;
