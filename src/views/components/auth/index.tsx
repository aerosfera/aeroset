import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import React from 'react';
import {AuthBackground, AuthFormContainer, SignInContainer} from './style';
import SignInForm from "./signIn";

const AuthPage: React.FC<{ theme: Theme }> = (props) => {
    return (
        <AuthFormContainer>
            <SignInContainer>
                <SignInForm/>
            </SignInContainer>
            <AuthBackground/>
        </AuthFormContainer>
    )
}

export default withTheme(AuthPage);
