export const LOGIN_DIALOG_VISIBLE = 'DIALOG_CONTROL_LOGIN_DIALOG_VISIBLE';
export const REGISTER_DIALOG_VISIBLE = 'DIALOG_CONTROL_REGISTER_DIALOG_VISIBLE';

interface LoginDialogVisibleAction {
    type: typeof LOGIN_DIALOG_VISIBLE;
    payload: boolean;
}

interface RegisterDialogVisibleAction {
    type: typeof REGISTER_DIALOG_VISIBLE;
    payload: boolean;
}

export type DialogControlTypes = LoginDialogVisibleAction |
                                RegisterDialogVisibleAction;
