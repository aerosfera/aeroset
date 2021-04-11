import {setAuthenticationUserInfo} from "./authStateManager";
import jwt_decode from "jwt-decode";
import kcAdminClient from "../../infrastructure/keycloak/keyCloakAdminClient";
import PouchDB from "../../infrastructure/pounchDB/pounchDB";
import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";
import {META_DB_CONNECTION_STRING} from "../../config/connection";

export const authorizeUserAsync = async (login: string, password: string): Promise<void> => {
    try {
        await kcAdminClient.auth({
            username: login,
            password: password,
            grantType: 'password',
            clientId: 'aeroset-client',
        });

        const token: string = kcAdminClient.accessToken;
        const decodedToken = <any>jwt_decode(token);

        const userId: string = decodedToken.sub;
        const user: UserRepresentation = await kcAdminClient.users.findOne({
            id: userId
        });

        const userAttributes: Record<string, any> = user.attributes as Record<string, any>;
        const organization: string = userAttributes['organization'];
        const isSolo = organization === "solo"
        const metaDatabaseName: string = userAttributes['database'];

        const metaDatabase = new PouchDB(`${META_DB_CONNECTION_STRING}/${organization}`,
            {
                jwtauth: {token: () => token},
                adapter: 'worker'
            });

        setAuthenticationUserInfo({
            userInfo: user,
            isSolo: isSolo,
            metaDatabase: metaDatabaseName
        });
        return Promise.resolve();

    } catch (ex) {

    }
}
