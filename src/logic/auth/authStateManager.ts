import AeroUser from "../../data/auth/AeroUser";
import {UserStatus} from "../../data/auth/UserStatus";
import {BehaviorSubject} from "rxjs";
import {setAuthUser} from "../../store/auth/authReducer";
import {store} from "../../store/store";

const userBehaviorObserver = async (user: AeroUser) => {
    switch (user.status) {
        case UserStatus.SignedIn:
            store.dispatch(setAuthUser(user));
            break
        case UserStatus.SignedOut:
            store.dispatch(setAuthUser(null));
            break
        default:
            console.log("User status unknown");
            break
    }
};
const userBehaviorSubject = new BehaviorSubject<AeroUser>(new AeroUser(undefined));
userBehaviorSubject.subscribe(userBehaviorObserver);

export const setAuthUUID = (userUUID: string | null) => {
    if (userUUID) {
        userBehaviorSubject.next(new AeroUser(userUUID)) //sign in
    } else {
        userBehaviorSubject.next(new AeroUser(null)) //sign out
    }
}
