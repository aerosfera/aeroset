import React, {useRef, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {InputAdornment, TextField} from "@material-ui/core";
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

const PasswordForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const passwordRef = useRef();
    // @ts-ignore
    const {email} = props;

    const [state, setState] = useState<{ errorText: string, showPassword: boolean }>({
        errorText: "",
        showPassword: false
    });
    const {errorText, showPassword} = state;
    const hasError = errorText !== "";

    const handleClickShowPassword = () => setState({...state, showPassword: true});
    const handleMouseDownPassword = () => setState({...state, showPassword: false});

    const handleAuthorize = async (e: any): Promise<void> => {
        // @ts-ignore
        const password = passwordRef!.current.value;

        try {
            const {token, user} = await authorizeUserAsync(email, password);
            const refreshTokenIntervalId = await setUpTokenRefresh(email, password);
            userBehaviorSubject.next(new AeroUser(user, token, refreshTokenIntervalId));

        } catch (ex) {
            if (ex instanceof AuthorizeException) {
                switch (ex.error) {
                    case AuthError.wrongPassword:
                        setState({...state, errorText: i18next.t('wrongPassword')});
                        break;
                    case AuthError.connectionError:
                        setState({...state, errorText: i18next.t('connectionError')});
                        break;

                }
            }
        }
    }


    const handleCreateAccount = (e: any) => {
        // @ts-ignore
        props.Back();
    }

    return (
        <div style={{display: "table", height: '100%', width: '100%'}}>
            <div style={{display: "table-row", height: '25%'}}>
            </div>
            <div style={{display: "table-row", height: '25%'}}>
                <Typography variant="h5">
                    {t('welcome')}
                </Typography>
            </div>
            <div style={{display: "table-row", height: '25%'}}>
                <div style={{display: "flex"}}>
                    <TextField
                        error={hasError}
                        inputRef={passwordRef}
                        style={{flex: "1", marginLeft: 48, marginRight: 48}}
                        id="outlined-error-helper-text"
                        label={t('password')}
                        helperText={errorText}
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
            </div>
            <div style={{display: "table-row", height: '25%'}}>
                <div style={{display: 'flex'}}>
                    <div style={{width: '100%'}}>
                        <Button onClick={handleCreateAccount}>{t('forgot_password')}</Button>
                    </div>
                    <div style={{width: '100%'}}>
                        <Button color="primary" disableElevation variant="contained"
                                onClick={handleAuthorize}>{t('next')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTheme(PasswordForm);