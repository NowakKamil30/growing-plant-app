/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerProps } from '@material-ui/core/Drawer';
import { CHANGE_MAIN_DRAWER_VISIBLE,
    CHANGE_MAIN_DRAWER_POSITION,
    EXPAND_SHOP_LIST,
    EXPAND_MY_DEVICES_LIST,
    EXPAND_CONTACT_LIST,
    DrawerControlTypes } from '../types/DrawerControlTypes';

export interface DrawerControlState {
    isMainDrawerVisible: boolean;
    mainDrawerAnchor: DrawerProps['anchor'];
    isExpandMyDevicesList: boolean;
    isExpandShopList: boolean;
    isExpandContactList: boolean;
}

const INITIAL_STATE: DrawerControlState = {
    isMainDrawerVisible: false,
    mainDrawerAnchor: 'left',
    isExpandMyDevicesList: false,
    isExpandShopList: false,
    isExpandContactList: false,
};

export const DrawerControlReducer = (state: DrawerControlState = INITIAL_STATE, action: DrawerControlTypes)
: DrawerControlState => {
    switch (action.type) {
        case CHANGE_MAIN_DRAWER_VISIBLE: {
            return { ...state, isMainDrawerVisible: action.payload };
        }

        case CHANGE_MAIN_DRAWER_POSITION: {

            return { ...state, mainDrawerAnchor: action.payload };
        }

        case EXPAND_SHOP_LIST: {
            return { ...state, isExpandShopList: action.payload };
        }

        case EXPAND_MY_DEVICES_LIST: {
            return { ...state, isExpandMyDevicesList: action.payload };
        }

        case EXPAND_CONTACT_LIST: {
            return { ...state, isExpandContactList: action.payload };
        }

        default: {
            return state;
        }
    }
};