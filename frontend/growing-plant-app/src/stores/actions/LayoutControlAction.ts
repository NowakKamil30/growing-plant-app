import { CHANGE_MAIN_DRAWER_VISIBLE, LayoutControlTypes } from '../types/LayoutControlTypes';

export const changeMainDrawerVisible = (isVisible: boolean): LayoutControlTypes => ({
    type: CHANGE_MAIN_DRAWER_VISIBLE,
    payload: isVisible,
});