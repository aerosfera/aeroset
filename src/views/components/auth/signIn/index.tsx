import React, {useEffect, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import EmailForm from "./email";
import DebugRouter from "../../debug/DebugRouter";
import PasswordForm from "./password";
import SignUpForm from "../signup";
import {AuthFormContainer} from "./style";
import {UserAccountInfo} from "./code/UserAccountInfo";
import CreateAccount from "../signup/createAccount";

const AuthForm: React.FC<{ theme: Theme }> = (props) => {
    const history = useHistory();
    let {path} = useRouteMatch();
    const emailPath = `${path}/email`;
    const signupPath = `${path}/signup`;
    const passwordPath = `${path}/password`;
    const createAccountPath = `${path}/createAccount`;

    const [state, setState] = useState<{ email: string, accountInfo: UserAccountInfo | null }>({
        email: "",
        accountInfo: null
    });
    const {email, accountInfo} = state;

    useEffect(() => {
        if (email !== "") {
            history.push(passwordPath);
        } else {
            history.push(emailPath);
        }
    }, [email]);

    useEffect(() => {
        if (accountInfo !== null) {
            history.push(createAccountPath);
        }
    }, [accountInfo])

    const handleCreateAccount = () => {
        history.push(signupPath);
    }

    const handleSignIn = () => {
        history.push(emailPath);
    }

    const handleBackFromPassword = (e: any) => {
        setState({...state, email: ""});
    }

    const handleEmailNext = (email: string) => {
        setState({...state, email: email});
    }

    const handleCreateUserAccount = (accountInfo: UserAccountInfo) => {
        setState({...state, accountInfo});
    }

    return (
        <AuthFormContainer>
            <DebugRouter>
                <Switch>
                    <Route path={emailPath}>
                        <EmailForm CreateAccount={handleCreateAccount} Next={handleEmailNext}/>
                    </Route>
                    <Route exact path={signupPath}>
                        <SignUpForm SignIn={handleSignIn} CreateUserAccount={handleCreateUserAccount}/>
                    </Route>
                    <Route exact path={passwordPath}>
                        <PasswordForm Back={handleBackFromPassword} email={email}/>
                    </Route>
                    <Route exact path={createAccountPath}>
                        <CreateAccount accountInfo={accountInfo}/>
                    </Route>
                </Switch>
            </DebugRouter>
        </AuthFormContainer>
    )
}

export default withTheme(AuthForm);