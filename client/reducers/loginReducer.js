/**
 * Created by hhy615 on 1/25/18.
 */

import { DISABLE_LOGIN, ENABLE_LOGIN } from '../actions/header/types'
import initialState from '/initialState'


export default function( state = initialState.login, action ){
  const {type} = action;

  switch(type){
    case DISABLE_LOGIN:
      return { ...state, enable : false };
    case ENABLE_LOGIN:
      return { ...state, enable : true };

    default:
      return state;
  }
}
