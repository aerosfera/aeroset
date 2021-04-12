import {UserStatus} from "./UserStatus";
import UserRepresentation from "keycloak-admin/lib/defs/userRepresentation";
import Timeout = NodeJS.Timeout;

class AeroUser {
    readonly status: UserStatus;
    readonly token: string | undefined;
    static refreshTokenIntervalId: Timeout | undefined;
    readonly userInfo: UserRepresentation | null | undefined;

    constructor(user: UserRepresentation | null | undefined, token: string | undefined = undefined, refreshTokenIntervalId: Timeout | undefined = undefined) {
        this.status =
            user === undefined ? UserStatus.Unknown :
                user === null ? UserStatus.SignedOut :
                    UserStatus.SignedIn

        switch (this.status) {
            case UserStatus.SignedIn:
                this.userInfo = user;
                this.token = token;
                AeroUser.refreshTokenIntervalId = refreshTokenIntervalId;
                break;
            case UserStatus.Unknown:
            case UserStatus.SignedOut:
                if (AeroUser.refreshTokenIntervalId){
                    clearInterval(AeroUser.refreshTokenIntervalId);
                    AeroUser.refreshTokenIntervalId = undefined;
                }
                break;

        }
    }
}

export default AeroUser;