/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
import { DrawerControlReducer, DrawerControlState } from './DrawerControlReducer';
import { DialogControlReducer, DialogControlState } from './DialogControlReducer';
import { AuthReducer, AuthReducerState } from './AuthReducer';
import { UserReducer, UserState } from './UserReducer';

  export default combineReducers({
    drawerControl: DrawerControlReducer,
    dialogControl: DialogControlReducer,
    auth: AuthReducer,
    user: UserReducer
  });

  export interface ReduceTypes {
    drawerControl: DrawerControlState;
    dialogControl: DialogControlState;
    auth: AuthReducerState;
    user: UserState;
  }