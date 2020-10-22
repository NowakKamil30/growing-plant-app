export const CHANGE_MAIN_DRAWER_VISIBLE = 'LAYOUT_CONTROL_CHANGE_MAIN_DRAWER_VISIBLE';

interface ChangeMainDrawerVisibleAction {
    type: typeof CHANGE_MAIN_DRAWER_VISIBLE;
    payload: boolean;
}

export type LayoutControlTypes = ChangeMainDrawerVisibleAction;