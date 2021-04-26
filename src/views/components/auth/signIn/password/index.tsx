import React, {useEffect, useRef, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {withTheme} from "styled-components";
import {AuthorizeException, authorizeUserAsync} from "../../../../../logic/auth/authorizeUserAsync";
import {AuthError} from "../../../../../data/auth/error/AuthError";
import {AppVisibilityIcon, AppVisibilityOffIcon} from "../../../shared/icons";
import i18next from "i18next";
import IconButton from "@material-ui/core/IconButton";
import {setUpTokenRefresh} from "../../../../../logic/auth/setUpTokenRefresh";
import {userBehaviorSubject} from "../../../../../logic/auth/authStateManager";
import AeroUser from "../../../../../data/auth/AeroUser";
import {AerosetLogoContainer, SpaceBetween, TableRowStyled, TableStyled} from "../../shared/style";
import AerosetLogo from "../../shared/AerosetLogo";

const PasswordForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const passwordRef = useRef();
    // @ts-ignore
    const {email} = props;

    const [state, setState] = useState<{
        errorText: string,
        showPassword: boolean,
        password: string
    }>({
        errorText: "",
        showPassword: false,
        password: ""
    });
    const {errorText, showPassword, password} = state;
    const hasError = errorText !== "";
    const passwordValidation = password !== "";

    useEffect(() => {
        if (!password || password === "")
            return;

        async function Authorize() {
            try {
                const {token, user} = await authorizeUserAsync(email, password);
                const refreshTokenIntervalId = await setUpTokenRefresh(email, password);
                userBehaviorSubject.next(new AeroUser(user, token, refreshTokenIntervalId));
            } catch (ex) {
                if (ex instanceof AuthorizeException) {
                    switch (ex.error) {
                        case AuthError.wrongPassword:
                            setState({...state, errorText: i18next.t('wrongPassword'), password: ""});
                            break;
                        case AuthError.connectionError:
                            setState({...state, errorText: i18next.t('connectionError'), password: ""});
                            break;
                    }
                }
            }
        }

        Authorize();
    }, [password]);

    const handleClickShowPassword = () => setState({...state, showPassword: true});
    const handleMouseDownPassword = () => setState({...state, showPassword: false});

    const handleAuthorize = async (e: any): Promise<void> => {
        // @ts-ignore
        const password = passwordRef!.current.value;

        if (!password || password === "") {
            setState({...state, errorText: i18next.t('passwordEmpty')});
            return;
        }

        setState({...state, password: password});
    }

    const handleCreateAccount = (e: any) => {
        // @ts-ignore
        props.Back();
    }

    return (
        <TableStyled>
            <TableRowStyled
                height={30}
                style={{
                    textAlign: "left"
                }}>
                <AerosetLogoContainer>
                    <AerosetLogo/>
                </AerosetLogoContainer>
            </TableRowStyled>
            <TableRowStyled height={20}>
                <Typography variant="h5">
                    {t('welcome')}
                </Typography>
            </TableRowStyled>
            <TableRowStyled height={30}>
                <div style={{display: "flex"}}>
                    <TextField
                        error={hasError}
                        inputRef={passwordRef}
                        style={{flex: "1", marginLeft: 48, marginRight: 48}}
                        id="outlined-error-helper-text"
                        label={t('password')}
                        helperText={errorText}
                        disabled={passwordValidation}
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <AppVisibilityIcon/> : <AppVisibilityOffIcon/>}
                                    </IconButton>
                                    {/*(hasError ? <AppErrorIcon/> : null)*/}
                                </InputAdornment>
                        }}
                    />
                </div>
            </TableRowStyled>
            <TableRowStyled height={20}>
                <SpaceBetween>
                    <Button onClick={handleCreateAccount}
                            disabled={passwordValidation}>
                        {t('forgot_password')}
                    </Button>
                    <CircularProgress size={30}
                                      style={{visibility: (passwordValidation ? "visible" : "collapse")}}/>
                    <Button color="primary"
                            disableElevation
                            variant="contained"
                            disabled={passwordValidation}
                            onClick={handleAuthorize}>
                        {t('next')}
                    </Button>
                </SpaceBetween>
            </TableRowStyled>
        </TableStyled>
    )
}

export default withTheme(PasswordForm);