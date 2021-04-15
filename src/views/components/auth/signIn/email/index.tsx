import React, {useRef} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import {withTheme} from "styled-components";
import {LogoContainer} from "./style";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ErrorIcon from '@material-ui/icons/Error';
import kcAdminClient from "../../../../../infrastructure/keycloak/keyCloakAdminClient";

const EmailForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const loginRef = useRef();

    const validateAsync = async (login: string): Promise<boolean> => {
        const userWithEmail = await kcAdminClient.users.count({email: login});
        const hasUser = userWithEmail > 0;
        return Promise.resolve(hasUser);
    }

    const handleNext = async (e: any): Promise<void> => {
        const login = loginRef!.current.value;
        const validationResult = await validateAsync(login);

        if (validationResult)
            // @ts-ignore
            props.Next(login);
    }


    const handleCreateAccount = (e: any) => {
        // @ts-ignore
        props.CreateAccount();
    }

    return (
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
                        <Button onClick={handleCreateAccount}>{t('create_account')}</Button>
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

export default withTheme(EmailForm);