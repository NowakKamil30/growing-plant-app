/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerProps } from '@material-ui/core/Drawer';

export const CHANGE_MAIN_DRAWER_VISIBLE = 'LAYOUT_CONTROL_CHANGE_MAIN_DRAWER_VISIBLE';
export const CHANGE_MAIN_DRAWER_POSITION = 'LAYOUT_CONTROL_CHANGE_MAIN_DRAWER_POSITION';

interface ChangeMainDrawerVisibleAction {
    type: typeof CHANGE_MAIN_DRAWER_VISIBLE;
    payload: boolean;
}

interface ChangeMainDrawerPositionAction {
    type: typeof CHANGE_MAIN_DRAWER_POSITION;
    payload: DrawerProps['anchor'];
}

export type LayoutControlTypes = ChangeMainDrawerPositionAction |  ChangeMainDrawerVisibleAction;