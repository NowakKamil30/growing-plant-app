/* eslint-disable @typescript-eslint/no-unused-vars */
import { CHANGE_MAIN_DRAWER_VISIBLE, LayoutControlTypes } from '../types/LayoutControlTypes';

export interface LayoutControlState {
    isMainDrawerVisible: boolean;
}

const INITIAL_STATE: LayoutControlState = {
    isMainDrawerVisible: false,
};

export const LayoutControlReducer = (state: LayoutControlState = INITIAL_STATE, action: LayoutControlTypes)
: LayoutControlState => {
    console.log(action, state);
    switch (action.type) {
        case CHANGE_MAIN_DRAWER_VISIBLE: {
            return { ...state, isMainDrawerVisible: action.payload };
        }

        default: {
            return state;
        }
    }
};