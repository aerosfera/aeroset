import AeroUser from "../../data/auth/AeroUser";
import {UserStatus} from "../../data/auth/UserStatus";
import firebase from "firebase";
import {BehaviorSubject} from "rxjs";
import {setAuthUser} from "../../store/auth/authReducer";
import clearAuthScreen from "../../views/auth/clearAuthScreen";
import {store} from "../../store/store";

const userBehaviorObserver = async (user: AeroUser) => {
    switch (user.status) {
        case UserStatus.SignedIn:
            store.dispatch(setAuthUser(user));
            clearAuthScreen();
            break
        case UserStatus.SignedOut:
            store.dispatch(setAuthUser(null));
            break
        default:
            console.log("User status unknown");
            break
    }
};

const authStateManager = () => {
    document.getElementById('root')!.style.display = 'none';

    // const userBehaviorSubject = new BehaviorSubject<AeroUser>(new AeroUser(undefined));
    // const authStateObserver = (userUUID: string | null) => {
    //     if (userUUID) {
    //         userBehaviorSubject.next(new AeroUser(userUUID)) //sign in
    //     } else {
    //         userBehaviorSubject.next(new AeroUser(null)) //sign out
    //     }
    // }
    // userBehaviorSubject.subscribe(userBehaviorObserver);
}

export default authStateManager;