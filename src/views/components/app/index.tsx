import React, {useEffect} from "react";
import {withTheme} from "styled-components";
import {AuthContainer} from "./styles";
import {Theme} from "@material-ui/core";
import AuthPage from "../auth";
import {useSelector} from "react-redux";
import {isAuthenticatedSelector} from "../../../store/auth/authReducer";
import Main from "../layout/main";
import {useHistory, Switch, Route} from "react-router-dom";

const App: React.FC<{ theme: Theme }> = (_) => {
    const history = useHistory();
    const isAuthenticated = useSelector(isAuthenticatedSelector);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/auth');
        }
    });

    return (
        <section>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route path="/auth">
                    <AuthPage/>
                </Route>
            </Switch>
        </section>
    );
}

export default withTheme(App);