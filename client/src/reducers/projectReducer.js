import { ApplyProject } from '../actions/types'

const defaultState = [];

export default function (state = defaultState, action) {
  if(action.type == ApplyProject) {
    const {id, result} = action;
    const projects = [];

    console.log("apply project");

    state.forEach(project => {
      const p = Object.assign({}, project);
      if (id == project.id)
        p.applicationResult = result;

      projects.push(p);
    });
      return projects;
  }
  else{
    return state;
  }
}
