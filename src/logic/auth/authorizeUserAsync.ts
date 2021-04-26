import {userBehaviorSubject} from "./authStateManager";
import jwt_decode from "jwt-decode";
import kcAdminClient from "../../infrastructure/keycloak/keyCloakAdminClient";
import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";
import {KEYCLOAK_CLIENT, KEYCLOAK_GRANT_TYPE} from "../../config/connection";
import {setUpTokenRefresh} from "./setUpTokenRefresh";
import AeroUser from "../../data/auth/AeroUser";
import {AuthError} from "../../data/auth/error/AuthError";

export class AuthorizeException {
    private readonly _error: AuthError;

    get error(): AuthError {
        return this._error;
    }

    constructor(authError: AuthError) {
        this._error = authError;
    }
}

export const authorizeUserAsync = async (login: string, password: string): Promise<{ user: UserRepresentation, token: string }> => {
    try {
        await kcAdminClient.auth({
            username: login,
            password: password,
            grantType: KEYCLOAK_GRANT_TYPE,
            clientId: KEYCLOAK_CLIENT,
        });

        const token: string = kcAdminClient.accessToken;
        const decodedToken = <any>jwt_decode(token);

        const userId: string = decodedToken.sub;
        const user: UserRepresentation = await kcAdminClient.users.findOne({
            id: userId
        });


        const refreshTokenIntervalId = await setUpTokenRefresh(login, password);
        userBehaviorSubject.next(new AeroUser(user, token, refreshTokenIntervalId));

        return {user: user, token: token};
    } catch (ex) {
        let error = new Error('Email authorization error');
        if (ex.response.status && (ex.response.status === 401)) {
            throw new AuthorizeException(AuthError.wrongPassword);
        } else if (ex.response.status && (ex.response.status === 403)) {
            throw new AuthorizeException(AuthError.userNotRegistered);
        } else {
            throw new AuthorizeException(AuthError.connectionError);
        }
    }
}
