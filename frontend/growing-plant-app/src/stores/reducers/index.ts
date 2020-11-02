/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
import { DrawerControlReducer, DrawerControlState } from './DrawerControlReducer';
import { DialogControlReducer, DialogControlState } from './DialogControlReducer';
import { AuthReducer, AuthReducerState } from './AuthReducer';

  export default combineReducers({
    drawerControl: DrawerControlReducer,
    dialogControl: DialogControlReducer,
    auth: AuthReducer
  });

  export interface ReduceTypes {
    drawerControl: DrawerControlState;
    dialogControl: DialogControlState;
    auth: AuthReducerState;
  }