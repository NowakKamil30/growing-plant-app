/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerProps } from '@material-ui/core/Drawer';
import { CHANGE_MAIN_DRAWER_VISIBLE, CHANGE_MAIN_DRAWER_POSITION, LayoutControlTypes } from '../types/LayoutControlTypes';

export interface LayoutControlState {
    isMainDrawerVisible: boolean;
    MainDrawerAnchor: DrawerProps['anchor'];
}

const INITIAL_STATE: LayoutControlState = {
    isMainDrawerVisible: false,
    MainDrawerAnchor: 'left',


};

export const LayoutControlReducer = (state: LayoutControlState = INITIAL_STATE, action: LayoutControlTypes)
: LayoutControlState => {
    switch (action.type) {
        case CHANGE_MAIN_DRAWER_VISIBLE: {
            return { ...state, isMainDrawerVisible: action.payload };
        }

        case CHANGE_MAIN_DRAWER_POSITION: {

            return { ...state, MainDrawerAnchor: action.payload };
        }

        default: {
            return state;
        }
    }
};