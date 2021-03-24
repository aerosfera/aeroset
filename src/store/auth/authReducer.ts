import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import AeroUser from "../../data/auth/AeroUser";
import produce from "immer";

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
        setAuthUser: (state: AuthState, action: PayloadAction<AeroUser | null>) =>
            produce(state, (draft) => {
                draft.user = action.payload;
            }),
    }
});

const {actions, reducer} = slice;
export const {
    setAuthUser
} = actions;

export default reducer;