import rootReducer from './rootReducer'
import {createStore} from "redux";
import getState from "./initialize/getState";

const initialState = getState();
export default createStore(rootReducer, initialState);