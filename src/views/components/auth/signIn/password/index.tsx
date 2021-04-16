import React, {useRef} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import Button from "@material-ui/core/Button";
import {withTheme} from "styled-components";
import {authorizeUserAsync} from "../../../../../logic/auth/authorizeUserAsync";
import {AuthError} from "../../../../../data/auth/error/AuthError";

const PasswordForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const loginRef = useRef();
    // @ts-ignore
    const {email} = props;

    const handleNext = async (e: any): Promise<void> => {
        const password = loginRef!.current.value;
        const error = await authorizeUserAsync(email, password);

        if (error !== AuthError.none)
            return;

        //Todo: handle this
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
                        error
                        inputRef={loginRef}
                        style={{flex: "1", marginLeft: 48, marginRight: 48}}
                        id="outlined-error-helper-text"
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Incorrect entry."
                        variant="outlined"
                        InputProps={{
                            endAdornment: <ErrorIcon/>
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
                                onClick={handleNext}>{t('next')}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTheme(PasswordForm);