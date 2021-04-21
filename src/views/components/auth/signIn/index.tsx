import React, {useEffect} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import EmailForm from "./email";
import {SignInFormContainer} from "./style";
import DebugRouter from "../../debug/DebugRouter";
import SignUpForm from "./signup";
import PasswordForm from "./password";

const SignInForm: React.FC<{ theme: Theme }> = (props) => {
    const history = useHistory();
    const location = useLocation();
    let {path, url} = useRouteMatch();

    const emailPath = `${path}/email`;
    const signupPath = `${path}/signup`;

    useEffect(() => {
        history.push(emailPath);
    }, [path]);


    const handleCreateAccount = () => {
        history.push(signupPath);
    }

    const handleSignIn = () => {
        history.push(emailPath);
    }

    const handleBackFromPassword = (e: any) => {
        handleSignIn();
    }

    return (
        <SignInFormContainer>
            <DebugRouter>
                <Switch>
                    <Route path={emailPath}>
                        <EmailForm CreateAccount={handleCreateAccount}/>
                    </Route>
                    <Route exact path={'/signup'}>
                        <SignUpForm SignIn={handleSignIn}/>
                    </Route>
                    <Route exact path={`${path}/password`}>
                        <PasswordForm Back={handleBackFromPassword}/>
                    </Route>
                </Switch>
            </DebugRouter>
        </SignInFormContainer>
    )
}

export default withTheme(SignInForm);