import React, {useRef, useState} from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {withTheme} from "styled-components";
import {SignInFormContainer} from './style';
import {useAppDispatch} from "../../../../store/store";
import {signInAction} from "../../../../store/auth/authReducer";
import {AuthState} from "./code/AuthState";
import {useTranslation} from "react-i18next";
import EmailForm from "./email";
import {TextField} from "@material-ui/core";

const SignInForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const [state, setState] = useState<{
        state: AuthState,
        email: string,
        password: string,
        name: string,
        surname: string,
    }>({
        state: AuthState.email,
        email: "",
        password: "",
        name: "",
        surname: "",
    })

    const loginRef = useRef();
    const passwordRef = useRef();

    const handleSignIn = (e: any) => {
        const login = loginRef!.current.value;
        const password = passwordRef!.current.value;

        try {
            dispatch(signInAction({login, password}));
        } finally {
            loginRef!.current.value = null;
            passwordRef!.current.value = null;
            e.preventDefault(); // no refresh
        }
    }

    const handleNext = (login: string) => {
        alert("next");
    }

    const createAccount = () => {
        alert("createAccount");
    }

    return (
        <SignInFormContainer>
            <div style={{height: '100%'}}>
                <EmailForm Next={handleNext} CreateAccount={createAccount}/>
            </div>
        </SignInFormContainer>
    )
}

export default withTheme(SignInForm);