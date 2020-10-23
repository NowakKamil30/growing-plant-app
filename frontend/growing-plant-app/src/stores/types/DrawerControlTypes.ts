/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerProps } from '@material-ui/core/Drawer';

export const CHANGE_MAIN_DRAWER_VISIBLE = 'DRAWER_CONTROL_CHANGE_MAIN_DRAWER_VISIBLE';
export const CHANGE_MAIN_DRAWER_POSITION = 'DRAWER_CONTROL_CHANGE_MAIN_DRAWER_POSITION';
export const EXPAND_MY_DEVICES_LIST = 'DRAWER_CONTROL_EXPAND_MY_DEVICES_LIST';
export const EXPAND_SHOP_LIST = 'DRAWER_CONTROL_EXPAND_SHOP_LIST';

interface ChangeMainDrawerVisibleAction {
    type: typeof CHANGE_MAIN_DRAWER_VISIBLE;
    payload: boolean;
}

interface ChangeMainDrawerPositionAction {
    type: typeof CHANGE_MAIN_DRAWER_POSITION;
    payload: DrawerProps['anchor'];
}

interface ExpandMyDevicesListAction {
    type: typeof EXPAND_MY_DEVICES_LIST;
    payload: boolean;
}

interface ExpandShopListAction {
    type: typeof EXPAND_SHOP_LIST;
    payload: boolean;
}

export type DrawerControlTypes = ChangeMainDrawerPositionAction |
                                    ChangeMainDrawerVisibleAction |
                                    ExpandMyDevicesListAction |
                                    ExpandShopListAction;