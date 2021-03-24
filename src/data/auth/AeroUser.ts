import {UserStatus} from "./UserStatus";
import firebase from "firebase";

class AeroUser {
    readonly status: UserStatus
    readonly value: firebase.User | undefined | null
    constructor(value: firebase.User | undefined | null) {
        this.status =
            value === undefined ? UserStatus.Unknown :
                value === null ? UserStatus.SignedOut :
                    UserStatus.SignedIn
        this.value = value
    }
}

export default AeroUser;