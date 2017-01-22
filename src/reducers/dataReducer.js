import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.data, action) {
  switch (action.type) {
    case types.LOAD_ALL_DATA:
      return action.data;

    // case types.LOAD_TODAY_DATA:
    //   return action.data;
    //
    // case types.LOAD_3DAY_DATA:
    //   return action.data;
    //
    // case types.LOAD_7DAY_DATA:
    //   return action.data;
    //
    // case types.LOAD_MONTH_DATA:
    //   return action.data;

    case types.STREAM_DATA:
      return [
        ...state.slice(1),
        Object.assign({}, action.data)
      ];

    default:
      return state;
  }
}
