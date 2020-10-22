/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerProps } from '@material-ui/core/Drawer';
import { CHANGE_MAIN_DRAWER_VISIBLE, CHANGE_MAIN_DRAWER_POSITION, LayoutControlTypes } from '../types/LayoutControlTypes';

export const changeMainDrawerVisible = (isVisible: boolean): LayoutControlTypes => ({
    type: CHANGE_MAIN_DRAWER_VISIBLE,
    payload: isVisible,
});

export const changeMainDrawerPosition = (drawerPosition: DrawerProps['anchor']): LayoutControlTypes => ({
    type: CHANGE_MAIN_DRAWER_POSITION,
    payload: drawerPosition,
});