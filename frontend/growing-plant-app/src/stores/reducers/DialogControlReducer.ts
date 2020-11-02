/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ADD_DEVICE_DIALOG_VISIBLE,
    DialogControlTypes,
    LOGIN_DIALOG_VISIBLE,
    REGISTER_DIALOG_VISIBLE
} from '../types/DialogControlTypes';

export interface DialogControlState {
    isLoginDialogVisible: boolean;
    isRegisterDialogVisible: boolean;
    isAddDeviceDialogVisible: boolean;
}

const INITIAL_STATE: DialogControlState = {
    isLoginDialogVisible: false,
    isRegisterDialogVisible: false,
    isAddDeviceDialogVisible: false,
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

        default: {
            return state;
        }
    }
};