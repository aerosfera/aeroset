import firebase from "firebase";
import * as firebaseui from "firebaseui";
import authConfig from "../../config/authConfig";

const showAuthScreen = () => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', authConfig);
}

export default showAuthScreen;