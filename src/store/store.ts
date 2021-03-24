import rootReducer from './rootReducer'
import {createStore, compose} from 'redux';
import loadState from "./loadState";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware/saga/rootSaga';
import {reduxFirestore} from "redux-firestore";
import firebaseConfig from "../config/firebaseConfig";
import showAuthScreen from "../views/auth/showAuthScreen";
import firebase from "firebase";
import authStateManager from '../logic/auth/authStateManager';

firebase.initializeApp(firebaseConfig);

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
    immutableCheck: false
}),
    sagaMiddleware];

const devMode = process.env.NODE_ENV === 'development';
if (devMode) {
    middleware.push(logger);
}

export const store = configureStore({
    reducer: rootReducer(),
    preloadedState: loadState(),
    middleware: middleware,
    devTools: devMode,
    // @ts-ignore
    enhancers: [reduxFirestore(firebase)]
});

sagaMiddleware.run(rootSaga);

authStateManager();

setTimeout(() => {
    if(!store.getState().auth.user)
        showAuthScreen()
}, 1200);

export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();