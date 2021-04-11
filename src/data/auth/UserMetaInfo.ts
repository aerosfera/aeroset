import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";

export interface UserMetaInfo {
    userInfo: UserRepresentation,
    isSolo: boolean,
    metaDatabase: string
}