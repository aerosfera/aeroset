import AeroUser from "../../../../data/auth/AeroUser";
import firebase from "firebase";

export function* authProcessorSaga(action: { payload: AeroUser | null }) {
    const user = action.payload;

    const auth = firebase.auth();

    if (!user && auth.currentUser) {
        auth.signOut();
        window.location.reload();
    }
}