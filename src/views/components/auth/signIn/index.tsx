import React, {useEffect} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import EmailForm from "./email";
import {SignInFormContainer} from "./style";
import DebugRouter from "../../debug/DebugRouter";
import SignUpForm from "./signup";

const SignInForm: React.FC<{ theme: Theme }> = (props) => {
    const history = useHistory();
    const location = useLocation();
    let {path, url} = useRouteMatch();

    const emailPath = `${path}/email`;
    const signupPath = `${path}/signup`;

    useEffect(() => {
        history.push(emailPath);
    }, [path]);


    const handleToEmail = () => {
        history.push(signupPath);
    }

    const handleCreateAccount = () => {
        history.push(emailPath);
    }

    return (
        <SignInFormContainer>
            <DebugRouter>
                <Switch>
                    <Route path={emailPath}>
                        <EmailForm Back={handleToEmail}/>
                    </Route>
                    <Route exact path={'/signup'}>
                        <SignUpForm Back={handleCreateAccount}/>
                    </Route>
                </Switch>
            </DebugRouter>
        </SignInFormContainer>
    )
}

export default withTheme(SignInForm);