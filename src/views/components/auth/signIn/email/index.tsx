import React, {useEffect, useRef, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import {withTheme} from "styled-components";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import kcAdminClient from "../../../../../infrastructure/keycloak/keyCloakAdminClient";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import {KEYCLOAK_CLIENT, KEYCLOAK_GRANT_TYPE} from "../../../../../config/connection";
import i18next from "i18next";
import {AppErrorIcon} from "../../../shared/icons";
import * as EmailValidator from 'email-validator';
import AerosetLogo from "../../shared/AerosetLogo";
import {AerosetLogoContainer, SpaceBetween, TableRowStyled, TableStyled} from "../../shared/style";

const EmailForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const loginRef = useRef();
    const {path} = useRouteMatch();

    const [state, setState] = useState<{ errorText: string, email: string }>({errorText: "", email: ""});
    const {errorText, email} = state;
    const hasError = errorText !== "";

    const emailConnectionValidate = email !== "";

    useEffect(() => {
        async function ValidateEmail() {
            const validationResult = await validateAsync(email).catch(ex => {
                if (ex.response && ex.response.status && ex.response.status === 401) {
                    setState({...state, errorText: i18next.t('emailNonExist'), email: ""});
                } else {
                    setState({...state, errorText: i18next.t('networkError'), email: ""});
                }
            });

            if (validationResult) {
                // @ts-ignore
                props.Next(email);
            }
        }

        ValidateEmail();
    }, [email])

    const validateAsync = async (email: string): Promise<boolean> => {
        await kcAdminClient.auth({
            username: "auth_client",
            password: "auth",
            grantType: KEYCLOAK_GRANT_TYPE,
            clientId: KEYCLOAK_CLIENT
        });

        let hasUser;
        const userWithEmail = await kcAdminClient.users.count({email: email});
        hasUser = userWithEmail > 0;

        return Promise.resolve(hasUser);
    }

    const handleNext = async (e: any): Promise<void> => {
        console.log("email");
        const loginTextField = loginRef!.current;
        //@ts-ignore
        const email = loginTextField.value;

        if (!email || email === "") {
            setState({...state, errorText: i18next.t('emailEmpty')});
            return;
        }

        const isEmailValidFormat = EmailValidator.validate(email);
        if (!isEmailValidFormat) {
            setState({...state, errorText: i18next.t('emailNotValid')});
            return;
        }

        setState({...state, email: email});
    }


    const handleCreateAccount = (e: any) => {
        // @ts-ignore
        props.CreateAccount();
    }

    return (
        <Switch>
            <Route exact path={path}>
                <TableStyled>
                    <TableRowStyled
                        style={{
                            height: '30%',
                            textAlign: "left"
                        }}>
                        <AerosetLogoContainer>
                            <AerosetLogo/>
                        </AerosetLogoContainer>
                    </TableRowStyled>
                    <TableRowStyled style={{height: '20%'}}>
                        <Typography variant="h5">
                            {t('enter')}
                        </Typography>
                    </TableRowStyled>
                    <TableRowStyled style={{height: '30%'}}>
                        <div style={{display: "flex", marginLeft: 48, marginRight: 48}}>
                            <TextField
                                error={hasError}
                                disabled={emailConnectionValidate}
                                inputRef={loginRef}
                                style={{flex: "1"}}
                                id="outlined-error-helper-text"
                                label={hasError ? t('error') : null}
                                placeholder={t('enter_email')}
                                helperText={errorText}
                                variant="outlined"
                                defaultValue={email !== "" ? email : undefined}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: "0 0 0 1000px white inset"
                                    }
                                }}
                                InputProps={{
                                    endAdornment: hasError ? <AppErrorIcon/> : null
                                }}
                            />
                        </div>
                    </TableRowStyled>
                    <TableRowStyled style={{height: '20%'}}>
                        <SpaceBetween>
                            <div>
                                <Button color="primary"
                                        disabled={emailConnectionValidate}
                                        onClick={handleCreateAccount}>
                                    {t('create_account')}
                                </Button>
                            </div>
                            <div style={{visibility: (emailConnectionValidate ? "visible" : "collapse")}}>
                                <CircularProgress size={30}/>
                            </div>
                            <div>
                                <Button color="primary"
                                        disabled={emailConnectionValidate}
                                        disableElevation
                                        variant="contained"
                                        onClick={handleNext}>
                                    {t('next')}
                                </Button>
                            </div>
                        </SpaceBetween>
                    </TableRowStyled>
                </TableStyled>
            </Route>
        </Switch>
    )
}

export default withTheme(EmailForm);