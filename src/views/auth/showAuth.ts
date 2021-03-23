import firebase from "firebase";
import * as firebaseui from "firebaseui";

const showAuth = () => {
    const authConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (user: any, redirectUrl: any) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                // @ts-ignore
                document.getElementById('bg-container').remove();
                // @ts-ignore
                document.getElementById('root').style.display = 'block';

                return false;  // Do not redirect.
            },
            uiShown: function () {
                // @ts-ignore
                document.getElementById('root').style.display = 'none';
            }
        },
        signInFlow: 'popup',  // Opens IDP Providers sign-in flow in a popup.
        signInSuccessUrl: '/', //redirect on main page
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: function () {
            window.location.assign('<your-privacy-policy-url>');
        }
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', authConfig);
}

export default showAuth;