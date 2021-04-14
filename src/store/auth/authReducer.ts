import {createSlice, PayloadAction, Selector} from "@reduxjs/toolkit";
import AeroUser from "../../data/auth/AeroUser";
import produce from "immer";
import {ApplicationState} from "../store";
import {createAction} from '@reduxjs/toolkit'
import {UserRole} from "../../data/auth/UserRole";
import {UserOrganization} from "../../data/auth/UserOrganization";
import {UserScheme} from "../../data/auth/UserScheme";
import {UserMeta} from "../../data/auth/UserMeta";
import {FamiliarUser} from "../../data/auth/FamiliarUser";
import {AppModule} from "../../data/auth/AppModule";
import {UserSettings} from "../../data/auth/UserSettings";

export interface AuthState {
    user: AeroUser | null,
    isAuthorizing: boolean,
    organization: UserOrganization | null,
    meta: UserMeta | null
    role: UserRole,
    modules: AppModule[],
    schemes: UserScheme[],
    familiarUsers: FamiliarUser[],
    uiSettings: UserSettings | null
}

const defaultState: AuthState = {
    user: null,
    isAuthorizing: false,
    organization: null,
    schemes: [],
    role: UserRole.User,
    meta: null,
    modules: [],
    familiarUsers: [],
    uiSettings: null
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
                draft.isAuthorizing = action.payload;
            }),
        // @ts-ignore
        setOrganization: (state: AuthState, action: PayloadAction<UserOrganization | null>) =>
            produce(state, (draft) => {
                draft.organization = action.payload;
            }),
        // @ts-ignore
        setUISettings: (state: AuthState, action: PayloadAction<UserSettings | null>) =>
            produce(state, (draft) => {
                draft.uiSettings = action.payload;
            }),
        // @ts-ignore
        setRole: (state: AuthState, action: PayloadAction<UserRole>) =>
            produce(state, (draft) => {
                draft.role = action.payload;
            }),
        // @ts-ignore
        setMeta: (state: AuthState, action: PayloadAction<UserMeta | null>) =>
            produce(state, (draft) => {
                draft.meta = action.payload;
            }),
        // @ts-ignore
        setModules: (state: AuthState, action: PayloadAction<UserModule[]>) =>
            produce(state, (draft) => {
                draft.modules = action.payload;
            }),
        // @ts-ignore
        setFamiliarUsers: (state: AuthState, action: PayloadAction<FamiliarUser[]>) =>
            produce(state, (draft) => {
                draft.familiarUsers = action.payload;
            }),
        // @ts-ignore
        deleteFamiliarUser: (state: AuthState, action: PayloadAction<FamiliarUser>) =>
            produce(state, (draft) => {
                const index = draft.familiarUsers.findIndex(user => user.id === action.payload.id);
                if (index !== -1) draft.familiarUsers.slice(index, 1);
            }),
        // @ts-ignore
        addFamiliarUser: (state: AuthState, action: PayloadAction<FamiliarUser>) =>
            produce(state, (draft) => {
                draft.familiarUsers.push(action.payload);
            }),
        // @ts-ignore
        updateFamiliarUser: (state: AuthState, action: PayloadAction<FamiliarUser>) =>
            produce(state, (draft) => {
                const index = draft.familiarUsers.findIndex(user => user.id === action.payload.id);
                if (index !== -1) draft.familiarUsers[index] = action.payload;
            }),
        // @ts-ignore
        setUserSchemes: (state: AuthState, action: PayloadAction<UserScheme[]>) =>
            produce(state, (draft) => {
                draft.schemes = action.payload;
            }),
        // @ts-ignore
        deleteUserScheme: (state: AuthState, action: PayloadAction<UserScheme>) =>
            produce(state, (draft) => {
                const index = draft.schemes.findIndex(user => user.id === action.payload.id);
                if (index !== -1) draft.schemes.slice(index, 1);
            }),
        // @ts-ignore
        addUserScheme: (state: AuthState, action: PayloadAction<UserScheme>) =>
            produce(state, (draft) => {
                draft.schemes.push(action.payload);
            }),
        // @ts-ignore
        updateUserScheme: (state: AuthState, action: PayloadAction<UserScheme>) =>
            produce(state, (draft) => {
                const index = draft.familiarUsers.findIndex(user => user.id === action.payload.id);
                if (index !== -1) draft.schemes[index] = action.payload;
            }),
    }
});

export const aeroUserModules: Selector<ApplicationState, AppModule[]> =
    state => state.auth.modules;

export const aeroUserFamiliarUsers: Selector<ApplicationState, FamiliarUser[]> =
    state => state.auth.familiarUsers;

export const aeroUserSchemes: Selector<ApplicationState, UserScheme[]> =
    state => state.auth.schemes;

export const aeroUserUserRole: Selector<ApplicationState, UserRole> =
    state => state.auth.role;

export const aeroUserOrganization: Selector<ApplicationState, UserOrganization | null> =
    state => state.auth.organization;

export const activeAeroUserSelector: Selector<ApplicationState, AeroUser | null> =
    state => state.auth.user;

export const isAuthenticatedSelector: Selector<ApplicationState, boolean> =
    state => state.auth.user !== null;

export const signInAction = createAction<{ login: string, password: string }>('auth/sigIn');

const {actions, reducer} = slice;
export const {
    setAuthUser,
    setIsAuthorization,
    addFamiliarUser,
    addUserScheme,
    deleteFamiliarUser,
    deleteUserScheme,
    setFamiliarUsers,
    setMeta,
    setModules,
    setOrganization,
    setRole,
    setUserSchemes,
    updateFamiliarUser,
    updateUserScheme,
    setUISettings
} = actions;

export default reducer;