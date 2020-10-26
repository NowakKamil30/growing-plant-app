/* eslint-disable @typescript-eslint/no-unused-vars */
import { DialogControlTypes, LOGIN_DIALOG_VISIBLE, REGISTER_DIALOG_VISIBLE } from '../types/DialogControlTypes';

export interface DialogControlState {
    isLoginDialogVisible: boolean;
    isRegisterDialogVisible: boolean;
}

const INITIAL_STATE: DialogControlState = {
    isLoginDialogVisible: false,
    isRegisterDialogVisible: false,
};

export const DialogControlReducer = (state: DialogControlState = INITIAL_STATE, action: DialogControlTypes)
: DialogControlState => {
    switch (action.type) {
        case LOGIN_DIALOG_VISIBLE: {
            return { ...state, isLoginDialogVisible: action.payload };
        }

        case REGISTER_DIALOG_VISIBLE: {
            return { ...state, isRegisterDialogVisible: action.payload };
        }

        default: {
            return state;
        }
    }
};