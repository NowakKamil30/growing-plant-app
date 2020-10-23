/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerProps } from '@material-ui/core/Drawer';
import {
    CHANGE_MAIN_DRAWER_VISIBLE,
    CHANGE_MAIN_DRAWER_POSITION,
    EXPAND_MY_DEVICES_LIST,
    EXPAND_SHOP_LIST,
    DrawerControlTypes
} from '../types/DrawerControlTypes';

export const changeMainDrawerVisible = (isVisible: boolean): DrawerControlTypes => ({
    type: CHANGE_MAIN_DRAWER_VISIBLE,
    payload: isVisible,
});

export const changeMainDrawerPosition = (drawerPosition: DrawerProps['anchor']): DrawerControlTypes => ({
    type: CHANGE_MAIN_DRAWER_POSITION,
    payload: drawerPosition,
});

export const expandMyDevicesList = (isVisible: boolean): DrawerControlTypes => ({
    type: EXPAND_MY_DEVICES_LIST,
    payload: isVisible,
});

export const expandShopList = (isVisible: boolean): DrawerControlTypes => ({
    type: EXPAND_SHOP_LIST,
    payload: isVisible,
});