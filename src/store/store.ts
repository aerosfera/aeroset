import rootReducer from './rootReducer'
import { createStore, compose } from 'redux';
import loadState from "./loadState";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware/saga/rootSaga';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import {reduxFirestore} from "redux-firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdw8hV0iSO4rScPn2Uc4N1Oybs_sq6B04",
    authDomain: "onyx-hangout-307711.firebaseapp.com",
    projectId: "onyx-hangout-307711",
    storageBucket: "onyx-hangout-307711.appspot.com",
    messagingSenderId: "1053203802857",
    appId: "1:1053203802857:web:1d16d24b2c4b28d0015e78",
    measurementId: "G-0QZV9VM4N7"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
    immutableCheck : false}),
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
    enhancers :[reduxFirestore(firebase)]
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();