import React, {useEffect, useRef, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import {withTheme} from "styled-components";
import Typography from "@material-ui/core/Typography";
import kcAdminClient from "../../../../../infrastructure/keycloak/keyCloakAdminClient";
import {KEYCLOAK_REALM} from "../../../../../config/connection";
import i18next from "i18next";

const CreateAccount: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation();
    // @ts-ignore
    const {accountInfo} = props;

    const [state, setState] = useState<{
        text: string,
    }>({
        text: "",
    });
    const {text} = state;
    const isProcess = text !== "";

    useEffect(() => {
        const {name, surname, email, password} = accountInfo;

        async function CreateAccountAsync() {
            const {id} = await kcAdminClient.users.create({
                realm: KEYCLOAK_REALM,
                firstName: name,
                lastName: surname,
                email: email,
                emailVerified: false,
                enabled: true
            });

            await kcAdminClient.users.resetPassword({
                realm: KEYCLOAK_REALM,
                id: id,
                credential: {
                    temporary: false,
                    type: 'password',
                    value: password
                }
            });
        }

        CreateAccountAsync().catch((err) => {
            setState({...state, text: i18next.t('enterSurname')})
        });
    }, [accountInfo]);

    return (
        <div style={{width: 448, height: 448}}>
            <Typography style={{verticalAlign: "middle"}}>
                {text}
            </Typography>
        </div>
    )
}

export default withTheme(CreateAccount);