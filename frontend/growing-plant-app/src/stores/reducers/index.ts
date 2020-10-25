/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
import { DrawerControlReducer, DrawerControlState } from './DrawerControlReducer';
import { DialogControlReducer, DialogControlState } from './DialogControlReducer';

  export default combineReducers({
    drawerControl: DrawerControlReducer,
    dialogControl: DialogControlReducer,
  });

  export interface ReduceTypes {
    drawerControl: DrawerControlState;
    dialogControl: DialogControlState;
  }