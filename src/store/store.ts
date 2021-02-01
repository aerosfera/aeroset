import rootReducer from './rootReducer'
import {compose} from "redux";
import loadState from "./loadState";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware/saga/rootSaga';

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({thunk: false, serializableCheck: false}), sagaMiddleware];

if (devMode) {
    middleware.push(logger);
}

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = configureStore({
    reducer: rootReducer(),
    preloadedState: loadState(),
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();