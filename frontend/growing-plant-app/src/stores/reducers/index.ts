/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from 'redux';
import { DrawerControlReducer, DrawerControlState } from './DrawerControlReducer';

  export default combineReducers({
    drawerControl: DrawerControlReducer
  });

  export interface ReduceTypes {
    drawerControl: DrawerControlState;
  }