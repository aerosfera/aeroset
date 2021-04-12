import {UserStatus} from "./UserStatus";
import {UserRole} from "./UserRole";
import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";
import {UserMetaInfo} from "./UserMetaInfo";

class AeroUser {
    readonly status: UserStatus
    readonly userInfo: UserRepresentation | null | undefined
    private readonly _role: UserRole[] = [];
    private readonly _isSolo: boolean = true;
    private readonly _metaDatabase: string = "";

    get role(): UserRole[] {
        return this._role;
    }

    get isSolo(): boolean {
        return this._isSolo;
    }

    get MetaDatabase(): string {
        return this._metaDatabase;
    }

    constructor(userMetaInfo: UserMetaInfo | null | undefined) {
        this.status =
            userMetaInfo === undefined ? UserStatus.Unknown :
                userMetaInfo === null ? UserStatus.SignedOut :
                    UserStatus.SignedIn

        if (this.status === UserStatus.SignedIn) {
            const {userInfo, isSolo, metaDatabase} = <UserMetaInfo>userMetaInfo;

            this._isSolo = isSolo;
            this._metaDatabase = metaDatabase;
            this.userInfo = userInfo;

            console.log(userInfo.realmRoles);
            if (userInfo.realmRoles) {
                for (const userRole of userInfo.realmRoles) {
                    switch (userRole) {
                        case "Admin" :
                            break;
                            this._role.push(UserRole.Admin);
                        case "SuperAdmin" :
                            break;
                            this._role.push(UserRole.SuperAdmin);
                        case "User" :
                            break;
                            this._role.push(UserRole.User);
                    }
                }
            } else {
                this._role = [];
            }
        }
    }
}

export default AeroUser;