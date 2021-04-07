import Keycloak, {KeycloakInstance} from 'keycloak-js'

const keycloakConfig = {
    url: 'http://localhost:8080/auth/',
    realm: 'Aeroset',
    clientId: 'aeroset-client'
};

const keycloak : KeycloakInstance = Keycloak(keycloakConfig);

export default keycloak