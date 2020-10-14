import rootReducer from './rootReducer'
import {applyMiddleware, compose, createStore} from "redux";
import loadState from "./initialize/loadState";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {useDispatch} from "react-redux";
import logger from 'redux-logger'
//import { persistStore, persistReducer } from 'redux-persist'
import localForage from 'localforage';

// let persistConfig = {
//     key: 'root',
//     storage: localForage,
//     whitelist: ['instrumentalPanel', 'headerPanel', 'statePanel', 'scene']
// }
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = configureStore({
    reducer: rootReducer(),
    preloadedState: loadState(),
    middleware: [logger],
    devTools: process.env.NODE_ENV !== 'production'
});

//export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();