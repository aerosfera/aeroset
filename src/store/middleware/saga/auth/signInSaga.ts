import {call, put} from "redux-saga/effects";
import {authorizeUserAsync} from "../../../../logic/auth/authorizeUserAsync";
import { setIsAuthorization } from "../../../auth/authReducer";

export function* signInSaga(action: { payload: { login: string, password: string } }) {
    const credentials = action.payload;

    yield put(setIsAuthorization(true));
    yield call(authorizeUserAsync, credentials.login, credentials.password);
    yield put(setIsAuthorization(false));
}