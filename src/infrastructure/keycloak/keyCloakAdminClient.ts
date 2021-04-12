import KcAdminClient from "keycloak-admin";
import Querystring from "querystring";
import {KEYCLOAK_HOST, KEYCLOAK_REALM} from "../../config/connection";

const kcAdminClient = new KcAdminClient(
    {
        baseUrl: `${KEYCLOAK_HOST}/auth`,
        realmName: KEYCLOAK_REALM,
        requestConfig: {
            paramsSerializer: function (params) {
                return Querystring.stringify(params)
            }
        }
    });

export default kcAdminClient;