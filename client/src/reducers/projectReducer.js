import { ApplyProject } from '../actions/types'

var defaultState= [];

export default function (state=defaultState, action) {
  if (action.type===ApplyProject) {
    var {id,result} = action;
    var projects = [];

    state.forEach(project=> {
      var p=Object.assign({}, project);

      if (id == project.id) {
        p.applicationResult = result;
      }
      projects.push(p);
    });

    return projects;
  } else {
    return state;
  }

}
