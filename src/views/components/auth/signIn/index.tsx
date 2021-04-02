import React, {useRef} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import Button from "@material-ui/core/Button";
import {SignInFormContainer, SubmitButton} from './style';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Avatar, Box, Checkbox, FormControlLabel, Link, Paper, TextField} from "@material-ui/core";
import {useAppDispatch} from "../../../../store/store";


const SignInForm: React.FC<{ theme: Theme }> = (props) => {
    const dispatch = useAppDispatch();

    const loginRef = useRef();
    const passwordRef = useRef();

    const handleSignIn = () => {
        const login = loginRef!.current.value;
        const password = passwordRef!.current.value;

        alert(login + password);
    }

    return (
        <SignInFormContainer>
            <div style={{height: 250}}>
                <form noValidate>
                    <TextField
                        inputRef={loginRef}
                        variant="standard"
                        margin="normal"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        ref={passwordRef}
                        variant="standard"
                        margin="normal"
                        required
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