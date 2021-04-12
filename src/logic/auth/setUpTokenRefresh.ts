import {
    KEYCLOAK_CLIENT,
    KEYCLOAK_GRANT_TYPE,
    KEYCLOAK_HOST,
    KEYCLOAK_REALM,
    KEYCLOAK_REFRESH_TOKEN_TIME_MS
} from "../../config/connection";
import kcAdminClient from "../../infrastructure/keycloak/keyCloakAdminClient";

export async function setUpTokenRefresh(login: string, password: string): Promise<NodeJS.Timeout> {
    // const keycloakIssuer = await Issuer.discover(
    //     `${KEYCLOAK_HOST}/auth/${KEYCLOAK_REALM}/${KEYCLOAK_CLIENT}`,
    // );
    //
    // const client = new keycloakIssuer.Client({
    //     client_id: KEYCLOAK_CLIENT,
    //     token_endpoint_auth_method: 'none', // to send only client_id in the header
    // });
    //
    // let tokenSet = await client.grant({
    //     grant_type: KEYCLOAK_GRANT_TYPE,
    //     username: login,
    //     password: password,
    // });
    //
    // const intervalId = setInterval(async () => {
    //     const refreshToken: string = <string>tokenSet.refresh_token;
    //     try {
    //         tokenSet = await client.refresh(refreshToken);
    //     } catch {
    //         //handle this
    //     }
    //     kcAdminClient.setAccessToken(<string>tokenSet.access_token);
    // }, KEYCLOAK_REFRESH_TOKEN_TIME_MS); // 58 seconds
    //
    // return intervalId;

    return setInterval(() => {});
}