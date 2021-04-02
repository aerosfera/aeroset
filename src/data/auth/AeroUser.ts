import {UserStatus} from "./UserStatus";
import {UserRole} from "./UserRole";

class AeroUser {
    readonly status: UserStatus
    readonly uuid: string | null | undefined
    private _role: UserRole = UserRole.User;

    get role(): UserRole {
        return this._role;
    }

    set role(value: UserRole) {
        this._role = value;
    }

    constructor(uuid: string | null | undefined) {
        this.status =
            uuid === undefined ? UserStatus.Unknown :
                uuid === null ? UserStatus.SignedOut :
                    UserStatus.SignedIn
        this.uuid = uuid
    }
}

export default AeroUser;