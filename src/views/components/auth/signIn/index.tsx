import React, {useEffect, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import EmailForm from "./email";
import {SignInFormContainer} from "./style";
import DebugRouter from "../../debug/DebugRouter";
import PasswordForm from "./password";
import SignUpForm from "../signup";

const SignInForm: React.FC<{ theme: Theme }> = (props) => {
    const history = useHistory();
    let {path, url} = useRouteMatch();
    const emailPath = `${path}/email`;
    const signupPath = `${path}/signup`;
    const passwordPath = `${path}/password`;

    const [state, setState] = useState<{ email: string }>({email: ""});
    const {email} = state;

    useEffect(() => {
        if (email !== "") {
            history.push(passwordPath);
        } else {
            history.push(emailPath);
        }
    }, [email]);

    const handleCreateAccount = () => {
        history.push(signupPath);
    }

    const handleSignIn = () => {
        history.push(emailPath);
    }

    const handleBackFromPassword = (e: any) => {
        setState({email: ""});
    }

    const handleEmailNext = (email: string) => {
        setState({email: email});
    }

    return (
        <SignInFormContainer>
            <DebugRouter>
                <Switch>
                    <Route path={emailPath}>
                        <EmailForm CreateAccount={handleCreateAccount} Next={handleEmailNext}/>
                    </Route>
                    <Route exact path={'/signup'}>
                        <SignUpForm SignIn={handleSignIn}/>
                    </Route>
                    <Route exact path={`${path}/password`}>
                        <PasswordForm Back={handleBackFromPassword} email={email}/>
                    </Route>
                </Switch>
            </DebugRouter>
        </SignInFormContainer>
    )
}

export default withTheme(SignInForm);