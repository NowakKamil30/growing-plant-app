/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerProps } from '@material-ui/core/Drawer';
import { CHANGE_MAIN_DRAWER_VISIBLE,
    CHANGE_MAIN_DRAWER_POSITION,
    EXPAND_SHOP_LIST,
    EXPAND_MY_DEVICES_LIST,
    DrawerControlTypes } from '../types/DrawerControlTypes';

export interface DrawerControlState {
    isMainDrawerVisible: boolean;
    MainDrawerAnchor: DrawerProps['anchor'];
    isExpandMyDevicesList: boolean;
    isExpandShopList: boolean;
}

const INITIAL_STATE: DrawerControlState = {
    isMainDrawerVisible: false,
    MainDrawerAnchor: 'left',
    isExpandMyDevicesList: false,
    isExpandShopList: false,
};

export const DrawerControlReducer = (state: DrawerControlState = INITIAL_STATE, action: DrawerControlTypes)
: DrawerControlState => {
    switch (action.type) {
        case CHANGE_MAIN_DRAWER_VISIBLE: {
            return { ...state, isMainDrawerVisible: action.payload };
        }

        case CHANGE_MAIN_DRAWER_POSITION: {

            return { ...state, MainDrawerAnchor: action.payload };
        }

        case EXPAND_SHOP_LIST: {
            return { ...state, isExpandShopList: action.payload };
        }

        case EXPAND_MY_DEVICES_LIST: {
            return { ...state, isExpandMyDevicesList: action.payload };
        }

        default: {
            return state;
        }
    }
};