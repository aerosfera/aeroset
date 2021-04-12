import AeroUser from "../../data/auth/AeroUser";
import {UserStatus} from "../../data/auth/UserStatus";
import {store} from "../../store/store";
import {setAuthUser} from "../../store/auth/authReducer";
import {BehaviorSubject} from "rxjs";
import {UserMetaInfo} from "../../data/auth/UserMetaInfo";

const userBehaviorObserver = async (user: AeroUser) => {
    switch (user.status) {
        case UserStatus.SignedIn:
            store.dispatch(setAuthUser(user));
            console.log("User status - SignedIn");
            break;
        case UserStatus.SignedOut:
            store.dispatch(setAuthUser(null));
            console.log("User status - SignedOut");
            break;
        default:
            console.log("User status - Unknown");
            break;
    }
};
const userBehaviorSubject = new BehaviorSubject<AeroUser>(new AeroUser(undefined, token, refreshTokenIntervalId));
userBehaviorSubject.subscribe(userBehaviorObserver);

export const setAuthenticationUserInfo = (userMetaInfo: UserMetaInfo | null | undefined) => {
    userBehaviorSubject.next(new AeroUser(userMetaInfo, token, refreshTokenIntervalId));
}