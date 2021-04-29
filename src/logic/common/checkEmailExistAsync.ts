import kcAdminClient from "../../infrastructure/keycloak/keyCloakAdminClient";
import {KEYCLOAK_CLIENT, KEYCLOAK_GRANT_TYPE} from "../../config/connection";

const checkEmailExistAsync = async (email: string): Promise<boolean> => {
    await kcAdminClient.auth({
        username: "auth_client",
        password: "auth",
        grantType: KEYCLOAK_GRANT_TYPE,
        clientId: KEYCLOAK_CLIENT
    });

    let hasUser;
    const userWithEmail = await kcAdminClient.users.count({email: email});
    hasUser = userWithEmail > 0;

    return Promise.resolve(hasUser);
}

export default checkEmailExistAsync;