import React, {useEffect, useRef, useState} from "react";
import createMuiTheme, {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import withTheme from "@material-ui/core/styles/withTheme";
import {AerosetLogoContainer, SpaceBetween, TableRowStyled, TableStyled, TableCellStyled} from "../shared/style";
import AerosetLogo from "../shared/AerosetLogo";
import {AppErrorIcon} from "../../shared/icons";
import {TypographySignUpStyled} from "./style";
import {strict} from "assert";
import i18next from "i18next";
import IMask from "imask";
import {ONLY_RUS_LETTER_MASK_OPTIONS} from "../../../../utilities/masks/mask";
import * as EmailValidator from "email-validator";

const SignUpForm: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation();

    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [state, setState] = useState<{
        name: string,
        surname: string,
        email: string,
        password: string,
        passwordConfirm: string,
        processSignUp: boolean,
        nameError: string,
        surnameError: string,
        emailError: string,
        passwordError: string,
        passwordConfirmError: string
    }>({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        processSignUp: false,
        nameError: "",
        surnameError: "",
        emailError: "",
        passwordError: "",
        passwordConfirmError: ""
    })

    const {
        name,
        surname,
        email,
        password,
        passwordConfirm,
        processSignUp
    } = state;

    let {
        nameError,
        surnameError,
        emailError,
        passwordError,
        passwordConfirmError
    } = state;

    const handleBack = (e: any) => {
        // @ts-ignore
        props.SignIn();
    }

    useEffect(() => {
        let nameMask: any;
        if (nameRef.current) {
            // @ts-ignore
            const nameEl = nameRef.current as HTMLInputElement;
            nameMask = IMask(nameEl, ONLY_RUS_LETTER_MASK_OPTIONS);
        }

        let surnameMask: any;
        if (surnameRef.current) {
            // @ts-ignore
            const surnameEl = surnameRef.current as HTMLInputElement;
            surnameMask = IMask(surnameEl, ONLY_RUS_LETTER_MASK_OPTIONS);
        }

        return () => {
            nameMask.destroy();
            surnameMask.destroy();
        }
    });


    const handleSignUp = (e: any) => {
        //@ts-ignore
        const nameValue = nameRef!.current.value;
        //@ts-ignore
        const surnameValue = surnameRef!.current.value;
        //@ts-ignore
        const emailValue = emailRef!.current.value;
        //@ts-ignore
        const passwordValue = passwordRef!.current.value;
        //@ts-ignore
        const passwordConfirmValue = passwordConfirmRef!.current.value;

        const nameValidationError = validateName(nameValue);
        const surnameValidationError = validateSurname(surnameValue);
        const emailValidationError = validateEmail(emailValue);
        const passwordValidationError = validatePassword(passwordValue);
        const passwordConfirmValidationError = validatePasswordConfirm(passwordValue, passwordConfirmValue);

        let hasError = false;
        if (nameValidationError !== null) {
            nameError = nameValidationError;
            hasError = true;
        }
        if (surnameValidationError !== null) {
            surnameError = surnameValidationError;
            hasError = true;
        }
        if (emailValidationError !== null) {
            emailError = emailValidationError;
            hasError = true;
        }
        if (passwordValidationError !== null) {
            passwordError = passwordValidationError;
            hasError = true;
        }
        if (passwordConfirmValidationError !== null) {
            passwordConfirmError = passwordConfirmValidationError;
            hasError = true;
        }

        if (hasError) {
            setState({...state, nameError, surnameError, emailError, passwordError, passwordConfirmError});
        } else {
            //Todo: create account
        }
    }

    const validateName = (name: string): string | null => {
        if (!name || name === "") {
            return i18next.t('enterName');
        }

        return null;
    }

    const validateSurname = (surname: string): string | null => {
        if (!surname || surname === "") {
            return i18next.t('enterSurname');
        }

        return null;
    }

    const validateEmail = (email: string): string | null => {
        if (!email || email === "") {
            return i18next.t('enterEmail');
        }

        const emailIsValid = EmailValidator.validate(email);
        if (!emailIsValid) {
            return i18next.t('emailNotValid');
        }

        return null;
    }

    const validatePassword = (password: string): string | null => {
        if (!password || password === "") {
            return i18next.t('enterPassword');
        }

        if (password.length < 8) {
            return i18next.t('passwordTooShort');
        }

        if (!hasNumbers(password)) {
            return i18next.t('passwordWithoutNumbers');
        }

        return null;
    }

    const hasNumbers = (str: string): boolean => {
        const regex = /\d/g;
        return regex.test(str);
    }

    const validatePasswordConfirm = (password: string, passwordConfirm: string): string | null => {
        if (!passwordConfirm || passwordConfirm === "") {
            return i18next.t('enterPasswordConfirm');
        }

        if (password !== passwordConfirm) {
            return i18next.t('passwordConfirmationInvalid');
        }

        return null;
    }


    return (
        <TableStyled style={{height: 550}}>
            <TableRowStyled
                height={20}
                style={{
                    textAlign: "left"
                }}>
                <AerosetLogoContainer>
                    <AerosetLogo/>
                </AerosetLogoContainer>
            </TableRowStyled>
            <TableRowStyled height={10}>
                <Typography variant="h5">
                    {t('create_account')}
                </Typography>
            </TableRowStyled>
            <TableRowStyled height={15}>
                <TableStyled style={{boxSizing: "border-box"}}>
                    <TableCellStyled>
                        <TextField
                            error={nameError}
                            disabled={processSignUp}
                            inputRef={nameRef}
                            style={{flex: "1", marginLeft: 48, marginRight: 12}}
                            id="outlined-error-helper-text"
                            label={nameError ? t('error') : t('name')}
                            placeholder={t('name')}
                            helperText={nameError}
                            variant="outlined"
                            defaultValue={name !== "" ? name : undefined}
                            inputProps={{
                                style: {
                                    WebkitBoxShadow: "0 0 0 1000px white inset"
                                },
                                maxLength: 18
                            }}
                            InputProps={{
                                endAdornment: nameError ? <AppErrorIcon/> : null
                            }}
                        />
                    </TableCellStyled>
                    <TableCellStyled>
                        <TextField
                            error={surnameError}
                            disabled={processSignUp}
                            inputRef={surnameRef}
                            style={{flex: "1", marginLeft: 12, marginRight: 48}}
                            id="outlined-error-helper-text"
                            label={surnameError ? t('error') : t('surname')}
                            placeholder={t('surname')}
                            helperText={surnameError}
                            variant="outlined"
                            defaultValue={surname !== "" ? surname : undefined}
                            inputProps={{
                                style: {
                                    WebkitBoxShadow: "0 0 0 1000px white inset"
                                },
                                maxLength: 18
                            }}
                            InputProps={{
                                endAdornment: surnameError ? <AppErrorIcon/> : null
                            }}/>
                    </TableCellStyled>
                </TableStyled>
            </TableRowStyled>
            <TableRowStyled height={15}>
                <TextField
                    error={emailError}
                    disabled={processSignUp}
                    inputRef={emailRef}
                    fullWidth
                    style={{maxWidth: 352}}
                    id="outlined-error-helper-text"
                    label={emailError ? t('error') : t('email')}
                    placeholder={t('email')}
                    helperText={emailError}
                    variant="outlined"
                    defaultValue={email !== "" ? email : undefined}
                    inputProps={{
                        style: {
                            WebkitBoxShadow: "0 0 0 1000px white inset"
                        },
                        maxLength: 18
                    }}
                    InputProps={{
                        endAdornment: emailError ? <AppErrorIcon/> : null
                    }}
                />
                <TypographySignUpStyled variant="body2">
                    {t('confirmEmail')}
                </TypographySignUpStyled>
            </TableRowStyled>
            <TableRowStyled height={10}>
                <div>
                    <TableStyled style={{boxSizing: "border-box"}}>
                        <TableCellStyled>
                            <TextField
                                error={passwordError}
                                disabled={processSignUp}
                                inputRef={passwordRef}
                                style={{flex: "1", marginLeft: 48, marginRight: 12}}
                                id="outlined-error-helper-text"
                                label={passwordError ? t('error') : t('password')}
                                placeholder={t('password')}
                                helperText={passwordError}
                                variant="outlined"
                                defaultValue={password !== "" ? password : undefined}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: "0 0 0 1000px white inset"
                                    },
                                    maxLength: 18
                                }}
                                InputProps={{
                                    endAdornment: passwordError ? <AppErrorIcon/> : null
                                }}
                            />
                        </TableCellStyled>
                        <TableCellStyled>
                            <TextField
                                error={passwordConfirmError}
                                disabled={processSignUp}
                                inputRef={passwordConfirmRef}
                                style={{flex: "1", marginLeft: 12, marginRight: 48}}
                                id="outlined-error-helper-text"
                                label={passwordConfirmError ? t('error') : t('confirm')}
                                placeholder={t('confirm')}
                                helperText={passwordConfirmError}
                                variant="outlined"
                                defaultValue={passwordConfirm !== "" ? passwordConfirm : undefined}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: "0 0 0 1000px white inset"
                                    },
                                    maxLength: 18
                                }}
                                InputProps={{
                                    endAdornment: passwordConfirmError ? <AppErrorIcon/> : null
                                }}
                            />
                        </TableCellStyled>
                    </TableStyled>
                    <TypographySignUpStyled variant="body2">
                        {t('passwordText')}
                    </TypographySignUpStyled>
                </div>
            </TableRowStyled>
            <TableRowStyled height={15}>
                <SpaceBetween>
                    <Button onClick={handleBack}
                            disabled={processSignUp}>
                        {t('enter2')}
                    </Button>
                    <CircularProgress size={30}
                                      style={{visibility: (processSignUp ? "visible" : "collapse")}}/>
                    <Button color="primary"
                            disableElevation
                            variant="contained"
                            disabled={processSignUp}
                            onClick={handleSignUp}>
                        {t('next')}
                    </Button>
                </SpaceBetween>
            </TableRowStyled>
        </TableStyled>
    )
}

export default withTheme(SignUpForm);