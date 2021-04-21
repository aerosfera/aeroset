import React, {useRef, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import Button from "@material-ui/core/Button";
import {withTheme} from "styled-components";
import {authorizeUserAsync} from "../../../../../logic/auth/authorizeUserAsync";
import {AuthError} from "../../../../../data/auth/error/AuthError";
import {useHistory} from "react-router-dom";
import {AppErrorIcon} from "../../../shared/icons";
import i18next from "i18next";

const PasswordForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const passwordRef = useRef();
    // @ts-ignore
    const {email} = props;
    const history = useHistory();

    const [state, setState] = useState<{ errorText: string }>({errorText: ""});
    const {errorText} = state;
    const hasError = errorText !== "";

    const handleAuthorize = async (e: any): Promise<void> => {
        // @ts-ignore
        const password = passwordRef!.current.value;
        const error : AuthError = await authorizeUserAsync(email, password);

        switch (error) {
            case AuthError.none:
                history.push("/");
                break;
            case AuthError.wrongPassword:
                setState({...state, errorText: i18next.t('wrongPassword')});
                break;
            case AuthError.connectionError:
                setState({...state, errorText: i18next.t('connectionError')});
                break;

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
                        type="password"
                        variant="outlined"
                        InputProps={{
                            endAdornment: hasError ? <AppErrorIcon/> : null
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