import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import AeroUser from "../../data/auth/AeroUser";
import produce from "immer";
import {ApplicationState} from "../store";
import {createAction} from '@reduxjs/toolkit'

export interface AuthState {
    user: AeroUser | null,
    isAuthorization : boolean
}

const defaultState: AuthState = {
    user: null,
    isAuthorization : false
}

const slice = createSlice({
    name: "authReducer",
    initialState: defaultState,
    reducers: {
        // @ts-ignore
        setAuthUser: (state: AuthState, action: PayloadAction<AeroUser | null>) =>
            produce(state, (draft) => {
                draft.user = action.payload;
            }),
        // @ts-ignore
        setIsAuthorization: (state: AuthState, action: PayloadAction<boolean>) =>
            produce(state, (draft) => {
                draft.isAuthorization = action.payload;
            }),
    }
});

export const activeAeroUserSelector: Selector<ApplicationState, AeroUser | null> =
    state => state.auth.user;

export const isAuthenticatedSelector: Selector<ApplicationState, boolean> =
    state => state.auth.user !== null;

export const signInAction = createAction<{ login: string, password: string }>('auth/sigIn');

const {actions, reducer} = slice;
export const {
    setAuthUser,
    setIsAuthorization,
} = actions;

export default reducer;