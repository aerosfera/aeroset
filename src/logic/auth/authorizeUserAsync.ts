import {userBehaviorSubject} from "./authStateManager";
import jwt_decode from "jwt-decode";
import kcAdminClient from "../../infrastructure/keycloak/keyCloakAdminClient";
import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";
import {KEYCLOAK_CLIENT, KEYCLOAK_GRANT_TYPE} from "../../config/connection";
import {setUpTokenRefresh} from "./setUpTokenRefresh";
import AeroUser from "../../data/auth/AeroUser";

export const authorizeUserAsync = async (login: string, password: string): Promise<void> => {
    try {
        if (login !== "foo@gmail.com" && password !== "12345")
            return Promise.resolve();

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

        console.log(user);
    } catch (ex) {
        //Todo: handle this
        console.error(ex);
        userBehaviorSubject.next(new AeroUser({id: "df"}));
    }

    return Promise.resolve();
}
