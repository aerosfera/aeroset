import rootReducer from './rootReducer'
import {applyMiddleware, compose, createStore} from "redux";
import loadState from "./initialize/loadState";
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// export default configureStore({
//     reducer: rootReducer,
//     preloadedState: loadState,
//     devTools: process.env.NODE_ENV !== 'production',
//     enhancers: composeEnhancers(applyMiddleware(thunk))
// });

const initialState = loadState();
export default createStore(rootReducer, initialState);