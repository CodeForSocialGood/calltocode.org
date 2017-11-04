
import projects from './projects.json'
import reducers from "../reducers";
import {combineReducers, createStore} from "redux";


var store = createStore(combineReducers(reducers), {"projects": projects});
export default store;
