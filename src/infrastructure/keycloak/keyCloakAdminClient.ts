import KcAdminClient from "keycloak-admin";
import Querystring from "querystring";

const kcAdminClient = new KcAdminClient({
    realmName: "Aeroset",
    requestConfig: {
        paramsSerializer: function (params) {
            return Querystring.stringify(params)
        },
    }
});

export default kcAdminClient;