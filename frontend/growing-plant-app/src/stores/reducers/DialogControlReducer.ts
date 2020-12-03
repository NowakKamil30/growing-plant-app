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

export interface DialogControlState {
    isLoginDialogVisible: boolean;
    isRegisterDialogVisible: boolean;
    isAddDeviceDialogVisible: boolean;
    isSuccessRegisterDialogVisible: boolean;
    isResetPasswordVisible: boolean;
    isSuccessResetPasswordVisible: boolean;
}

const INITIAL_STATE: DialogControlState = {
    isLoginDialogVisible: false,
    isRegisterDialogVisible: false,
    isAddDeviceDialogVisible: false,
    isSuccessRegisterDialogVisible: false,
    isResetPasswordVisible: false,
    isSuccessResetPasswordVisible: false
};

export const DialogControlReducer = (state: DialogControlState = INITIAL_STATE, action: DialogControlTypes)
: DialogControlState => {
    switch (action.type) {
        case LOGIN_DIALOG_VISIBLE: {
            return { ...state, isLoginDialogVisible: action.payload };
        }

        case ADD_DEVICE_DIALOG_VISIBLE: {
            return { ...state, isAddDeviceDialogVisible: action.payload };
        }

        case REGISTER_DIALOG_VISIBLE: {
            return { ...state, isRegisterDialogVisible: action.payload };
        }

        case SUCCESS_REGISTER_DIALOG_VISIBLE: {
            return { ...state, isSuccessRegisterDialogVisible: action.payload };
        }

        case RESET_PASSWORD_DIALOG_VISIBLE: {
            return { ...state, isResetPasswordVisible: action.payload };
        }

        case SUCCESS_RESET_PASSWORD_DIALOG_VISIBLE: {
            return { ...state, isSuccessResetPasswordVisible: action.payload };
        }

        default: {
            return state;
        }
    }
};