/* eslint-disable @typescript-eslint/no-unused-vars */
import { DialogControlTypes } from '../types/DialogControlTypes';

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

        default: {
            return state;
        }
    }
};