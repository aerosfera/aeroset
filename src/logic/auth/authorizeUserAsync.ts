import { setAuthUser } from "../../store/auth/authReducer";
import {store} from "../../store/store";
import {setAuthUUID} from "./authStateManager";
import {nanoid} from "@reduxjs/toolkit";

export const authorizeUserAsync = (login: string, password: string): Promise<void> => {
    //Todo: authorize


    setAuthUUID(nanoid(10));
    return Promise.resolve();
}
