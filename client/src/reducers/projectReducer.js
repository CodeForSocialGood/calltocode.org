import { ApplyProject } from '../actions/types'

var defaultState= [];

export default function (state=defaultState, action) {
  if (action.type===ApplyProject) {
      console.log("projectReducer is called");
  }

  return state;
}
