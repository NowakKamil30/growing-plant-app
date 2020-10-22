  import { combineReducers } from 'redux';
import { LayoutControlReducer, LayoutControlState } from './LayoutControlReducer';

  export default combineReducers({
    layoutControl: LayoutControlReducer
  });

  export interface ReduceTypes {
    layoutControl: LayoutControlState;
  }