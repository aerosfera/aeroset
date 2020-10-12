import rootReducer from './rootReducer'
import {createStore} from "redux";
import loadState from "./initialize/loadState";
import {configureStore} from '@reduxjs/toolkit'


const initialState = loadState();
export default configureStore({
    reducer: rootReducer,
    preloadedState: loadState,
    devTools: process.env.NODE_ENV !== 'production',

});