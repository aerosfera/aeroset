import React, {useRef} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {SignInFormContainer, SubmitButton} from './style';
import {TextField} from "@material-ui/core";
import {useAppDispatch} from "../../../../store/store";
import {signInAction} from "../../../../store/auth/authReducer";

const SignInForm: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch();

    const loginRef = useRef();
    const passwordRef = useRef();

    const handleSignIn = (e: any) => {
        const login = loginRef!.current.value;
        const password = passwordRef!.current.value;

        try {
            dispatch(signInAction({login, password}));
        }
        finally {
            loginRef!.current.value = null;
            passwordRef!.current.value = null;
            e.preventDefault(); // no refresh
        }

    }

    return (
        <SignInFormContainer>
            <div style={{height: 250}}>
                <form noValidate no>
                    <TextField
                        inputRef={loginRef}
                        variant="standard"
                        margin="normal"
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        inputRef={passwordRef}
                        variant="standard"
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <SubmitButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSignIn}>Sign In</SubmitButton>
                </form>
            </div>
        </SignInFormContainer>
    )
}

export default withTheme(SignInForm);