import React, {useEffect, useRef, useState} from "react";
import createMuiTheme, {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, InputAdornment, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import withTheme from "@material-ui/core/styles/withTheme";
import {AerosetLogoContainer, SpaceBetween, TableRowStyled, TableStyled, TableCellStyled} from "../shared/style";
import AerosetLogo from "../shared/AerosetLogo";
import {AppErrorIcon, AppVisibilityIcon, AppVisibilityOffIcon} from "../../shared/icons";
import {TypographySignUpStyled} from "./style";
import {strict} from "assert";
import i18next from "i18next";
import IMask from "imask";
import {ONLY_RUS_LETTER_MASK_OPTIONS} from "../../../../utilities/masks/mask";
import * as EmailValidator from "email-validator";
import checkEmailExistAsync from "../../../../logic/common/checkEmailExistAsync";
import IconButton from "@material-ui/core/IconButton";
import kcAdminClient from "../../../../infrastructure/keycloak/keyCloakAdminClient";
import {KEYCLOAK_CLIENT, KEYCLOAK_GRANT_TYPE, KEYCLOAK_REALM} from "../../../../config/connection";

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
        processValidation: boolean,
        nameError: string,
        surnameError: string,
        emailError: string,
        passwordError: string,
        passwordConfirmError: string,
        showPassword: boolean
    }>({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        processSignUp: false,
        processValidation: false,
        nameError: "",
        surnameError: "",
        emailError: "",
        passwordError: "",
        passwordConfirmError: "",
        showPassword: false
    })

    const {
        name,
        surname,
        email,
        password,
        passwordConfirm,
        processSignUp,
        processValidation,
        showPassword
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

    useEffect(() => {
            async function ValidateAsync() {
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
                const emailValidationError = await validateEmailAsync(emailValue);
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
                    setState({
                        ...state,
                        nameError,
                        surnameError,
                        emailError,
                        passwordError,
                        passwordConfirmError,
                        processValidation: false,
                        processSignUp: false
                    });
                } else {
                    setState({...state, processValidation: false, processSignUp: true});
                }
            }

            if (processValidation) {
                ValidateAsync();
            }
        }, [processValidation]
    );

    useEffect(() => {

        if (processSignUp) {
            // @ts-ignore
            props.CreateUserAccount({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        }

    }, [processSignUp]);


    const handleSignUp = async (e: any) => {
        setState({...state, processValidation: true});
    }

    const validateName = (name: string): string => {
        if (!name || name === "") {
            return i18next.t('enterName');
        }

        return "";
    }

    const validateSurname = (surname: string): string => {
        if (!surname || surname === "") {
            return i18next.t('enterSurname');
        }

        return "";
    }

    const validateEmailAsync = (email: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            if (!email || email === "") {
                resolve(i18next.t('enterEmail'));
            }

            const emailIsValid = EmailValidator.validate(email);
            if (!emailIsValid) {
                resolve(i18next.t('emailNotValid'));
            }

            const validationResult = await checkEmailExistAsync(email).catch(ex => {
                if (ex.response && ex.response.status && ex.response.status === 401) {
                    resolve(i18next.t('emailExist'));
                } else {
                    resolve(i18next.t('connectionError'));
                }
            });

            if (!validationResult) {
                resolve(i18next.t('emailExist'));
            }

            resolve("");
        });
    }

    const validatePassword = (password: string): string => {
        if (!password || password === "") {
            return i18next.t('enterPassword');
        }

        if (password.length < 8) {
            return i18next.t('passwordTooShort');
        }

        if (!hasNumbers(password)) {
            return i18next.t('passwordWithoutNumbers');
        }

        return "";
    }

    const hasNumbers = (str: string): boolean => {
        const regex = /\d/g;
        return regex.test(str);
    }

    const validatePasswordConfirm = (password: string, passwordConfirm: string): string => {
        if (!passwordConfirm || passwordConfirm === "") {
            return i18next.t('enterPasswordConfirm');
        }

        if (password !== passwordConfirm) {
            return i18next.t('passwordConfirmationInvalid');
        }

        return "";
    }

    const handleClickShowPassword = () => setState({...state, showPassword: true});
    const handleMouseDownPassword = () => setState({...state, showPassword: false});

    let additionalHeight = 0;
    if (nameError !== "" || emailError !== "" || passwordError !== "" || surnameError !== "" || passwordConfirmError !== "")
        additionalHeight = 24;

    return (
        <TableStyled style={{height: (550 + additionalHeight)}}>
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
                            disabled={(processSignUp || processValidation)}
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
                                endAdornment: nameError ? <AppErrorIcon style={{marginLeft: 12}}/> : null
                            }}
                        />
                    </TableCellStyled>
                    <TableCellStyled>
                        <TextField
                            error={surnameError}
                            disabled={(processSignUp || processValidation)}
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
                                endAdornment: surnameError ? <AppErrorIcon style={{marginLeft: 12}}/> : null
                            }}/>
                    </TableCellStyled>
                </TableStyled>
            </TableRowStyled>
            <TableRowStyled height={15}>
                <TextField
                    error={emailError}
                    disabled={(processSignUp || processValidation)}
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
                        endAdornment: emailError ? <AppErrorIcon style={{marginLeft: 12}}/> : null
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
                                disabled={(processSignUp || processValidation)}
                                inputRef={passwordRef}
                                style={{flex: "1", marginLeft: 48, marginRight: 12}}
                                id="outlined-error-helper-text"
                                label={passwordError ? t('error') : t('password')}
                                placeholder={t('password')}
                                helperText={passwordError}
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                defaultValue={password !== "" ? password : undefined}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: "0 0 0 1000px white inset"
                                    },
                                    maxLength: 18
                                }}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" style={{maxWidth: 16}}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                style={{maxWidth: 13, maxHeight: 13, marginRight: 6}}
                                            >
                                                {showPassword ? <AppVisibilityIcon/> : <AppVisibilityOffIcon/>}
                                            </IconButton>
                                            {/*(hasError ? <AppErrorIcon/> : null)*/}
                                        </InputAdornment>
                                }}
                            />
                        </TableCellStyled>
                        <TableCellStyled>
                            <TextField
                                error={passwordConfirmError}
                                disabled={(processSignUp || processValidation)}
                                inputRef={passwordConfirmRef}
                                style={{flex: "1", marginLeft: 12, marginRight: 48}}
                                id="outlined-error-helper-text"
                                label={passwordConfirmError ? t('error') : t('confirm')}
                                placeholder={t('confirm')}
                                helperText={passwordConfirmError}
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                defaultValue={passwordConfirm !== "" ? passwordConfirm : undefined}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: "0 0 0 1000px white inset"
                                    },
                                    maxLength: 18
                                }}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end" style={{maxWidth: 16}}>
                                            <IconButton
                                                style={{maxWidth: 13, maxHeight: 13, marginRight: 6}}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <AppVisibilityIcon/> : <AppVisibilityOffIcon/>}
                                            </IconButton>
                                            {/*(hasError ? <AppErrorIcon/> : null)*/}
                                        </InputAdornment>
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
                            disabled={(processSignUp || processValidation)}>
                        {t('enter2')}
                    </Button>
                    <div>
                        <CircularProgress size={30}
                                          style={
                                              {
                                                  visibility: ((processSignUp || processValidation) ? "visible" : "collapse"),
                                                  marginRight: 16,
                                                  verticalAlign: "middle"
                                              }
                                          }/>
                        <Button color="primary"
                                disableElevation
                                disabled={(processSignUp || processValidation)}
                                variant="contained"
                                onClick={handleSignUp}>
                            {t('next')}
                        </Button>
                    </div>
                </SpaceBetween>
            </TableRowStyled>
        </TableStyled>
    )
}

export default withTheme(SignUpForm);