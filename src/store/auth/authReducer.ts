import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import AeroUser from "../../data/auth/AeroUser";
import produce from "immer";
import {ApplicationState} from "../store";
import {SchemeUI} from "../../data/ui/SchemeUI";

export interface AuthState {
    user: AeroUser | null
}

const defaultState: AuthState = {
    user: null,
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
    }
});

export const activeAeroUserSelector: Selector<ApplicationState, AeroUser | null> =
    state => state.auth.user;

export const isAuthenticatedSelector: Selector<ApplicationState, boolean> =
    state => state.auth.user !== null;

const {actions, reducer} = slice;
export const {
    setAuthUser
} = actions;

export default reducer;