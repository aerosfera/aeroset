import React, {useRef, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import {withTheme} from "styled-components";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import kcAdminClient from "../../../../../infrastructure/keycloak/keyCloakAdminClient";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import PasswordForm from "../password";
import {KEYCLOAK_CLIENT, KEYCLOAK_GRANT_TYPE} from "../../../../../config/connection";
import i18next from "i18next";
import {AppErrorIcon} from "../../../shared/icons";

const EmailForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const loginRef = useRef();
    const history = useHistory();
    const {path} = useRouteMatch();

    const [state, setState] = useState<{ errorText: string, email: string }>({errorText: "", email: ""});
    const {errorText, email} = state;
    const hasError = errorText !== "";

    const validateAsync = async (login: string): Promise<boolean> => {
        await kcAdminClient.auth({
            username: "aero",
            password: "aero",
            grantType: KEYCLOAK_GRANT_TYPE,
            clientId: KEYCLOAK_CLIENT
        });

        let hasUser = false;
        const userWithEmail = await kcAdminClient.users.count({email: login});
        hasUser = userWithEmail > 0;

        return Promise.resolve(hasUser);
    }

    const handleNext = async (e: any): Promise<void> => {

        const loginTextField = loginRef!.current;
        //@ts-ignore
        const login = loginTextField.value;

        const validationResult = await validateAsync(login).catch(ex => {
            if (ex.response.status === 401) {
                setState({...state, errorText: i18next.t('emailNonExist')});
            } else {
                setState({...state, errorText: i18next.t('networkError')});
            }
        });

        if (validationResult) {
            history.push(`${path}/password`);
            setState({...state, email: login});
        } else {
            setState({...state, errorText: i18next.t('emailNonExist')});
        }
    }


    const handleCreateAccount = (e: any) => {
        // @ts-ignore
        props.Back();
    }

    const handleBackFromPassword = (e: any) => {
        history.push(`${path}`);
    }

    return (
        <Switch>
            <Route exact path={path}>
                <div style={{display: "table", height: '100%', width: '100%'}}>
                    <div style={{display: "table-row", height: '25%'}}>
                    </div>
                    <div style={{display: "table-row", height: '25%'}}>
                        <Typography variant="h5">
                            {t('enter')}
                        </Typography>
                    </div>
                    <div style={{display: "table-row", height: '25%'}}>
                        <div style={{display: "flex"}}>
                            <TextField
                                error={hasError}
                                inputRef={loginRef}
                                style={{flex: "1", marginLeft: 48, marginRight: 48}}
                                id="outlined-error-helper-text"
                                label={hasError ? t('error') : null}
                                placeholder={t('enter_email')}
                                helperText={errorText}
                                variant="outlined"
                                defaultValue={email !== "" ? email : undefined}
                                InputProps={{
                                    endAdornment: hasError ? <AppErrorIcon/> : null
                                }}
                            />
                        </div>
                    </div>
                    <div style={{display: "table-row", height: '25%'}}>
                        <div style={{display: 'flex'}}>
                            <div style={{width: '100%'}}>
                                <Button onClick={handleCreateAccount}>{t('create_account')}</Button>
                            </div>
                            <div style={{width: '100%'}}>
                                <Button color="primary" disableElevation variant="contained"
                                        onClick={handleNext}>{t('next')}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Route>
            <Route exact path={`${path}/password`}>
                <PasswordForm Back={handleBackFromPassword}/>
            </Route>
        </Switch>
    )
}

export default withTheme(EmailForm);