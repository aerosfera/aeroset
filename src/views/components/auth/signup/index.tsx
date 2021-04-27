import React, {useRef, useState} from "react";
import createMuiTheme, {Theme} from "@material-ui/core/styles/createMuiTheme";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {CircularProgress, TableCell, TextField, ThemeProvider} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import Button from "@material-ui/core/Button";
import withTheme from "@material-ui/core/styles/withTheme";
import {AerosetLogoContainer, SpaceBetween, TableRowStyled, TableStyled, TableCellStyled} from "../shared/style";
import AerosetLogo from "../shared/AerosetLogo";
import {AppErrorIcon} from "../../shared/icons";


const localTheme = createMuiTheme({
    overrides: {
        MuiTypography: {
            body2: {
                fontSize: [12, "!important"]
            }
        }
    }
});

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
        invalidName: boolean,
        invalidSurname: boolean,
        invalidEmail: boolean,
        invalidPassword: boolean,
        invalidPasswordConfirm: boolean
    }>({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        processSignUp: false,
        invalidName: false,
        invalidSurname: false,
        invalidEmail: false,
        invalidPassword: false,
        invalidPasswordConfirm: false
    })

    const {
        name,
        surname,
        email,
        password,
        passwordConfirm,
        processSignUp,
        invalidName,
        invalidEmail,
        invalidPassword,
        invalidPasswordConfirm,
        invalidSurname
    } = state;

    const handleBack = (e: any) => {
        // @ts-ignore
        props.SignIn();
    }

    const handleSignUp = (e: any) => {

    }

    return (
        <TableStyled style={{height: 500}}>
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
                            error={invalidName}
                            disabled={processSignUp}
                            inputRef={nameRef}
                            style={{flex: "1", marginLeft: 48, marginRight: 12}}
                            id="outlined-error-helper-text"
                            label={invalidName ? t('error') : null}
                            placeholder={t('name')}
                            helperText={invalidName}
                            variant="outlined"
                            defaultValue={name !== "" ? name : undefined}
                            inputProps={{
                                style: {
                                    WebkitBoxShadow: "0 0 0 1000px white inset"
                                }
                            }}
                            InputProps={{
                                endAdornment: invalidName ? <AppErrorIcon/> : null
                            }}
                        />
                    </TableCellStyled>
                    <TableCellStyled>
                        <TextField
                            error={invalidSurname}
                            disabled={processSignUp}
                            inputRef={surnameRef}
                            style={{flex: "1", marginLeft: 12, marginRight: 48}}
                            id="outlined-error-helper-text"
                            label={invalidSurname ? t('error') : null}
                            placeholder={t('surname')}
                            helperText={invalidSurname}
                            variant="outlined"
                            defaultValue={surname !== "" ? surname : undefined}
                            inputProps={{
                                style: {
                                    WebkitBoxShadow: "0 0 0 1000px white inset"
                                }
                            }}
                            InputProps={{
                                endAdornment: invalidSurname ? <AppErrorIcon/> : null
                            }}/>
                    </TableCellStyled>
                </TableStyled>
            </TableRowStyled>
            <TableRowStyled height={15}>
                <TextField
                    error={invalidEmail}
                    disabled={processSignUp}
                    inputRef={emailRef}
                    fullWidth
                    style={{maxWidth: 352}}
                    id="outlined-error-helper-text"
                    label={invalidEmail ? t('error') : null}
                    placeholder={t('email')}
                    helperText={invalidEmail}
                    variant="outlined"
                    defaultValue={email !== "" ? email : undefined}
                    inputProps={{
                        style: {
                            WebkitBoxShadow: "0 0 0 1000px white inset"
                        }
                    }}
                    InputProps={{
                        endAdornment: invalidEmail ? <AppErrorIcon/> : null
                    }}
                />
                <Typography variant="body2"
                    style={{marginLeft: 48, marginRight: 48,
                    fontSize: 12}}>
                    {t('confirmEmail')}
                </Typography>
            </TableRowStyled>
            <TableRowStyled height={15}>
                <div>
                    <TableStyled style={{boxSizing: "border-box"}}>
                        <TableCellStyled>
                            <TextField
                                error={invalidPassword}
                                disabled={processSignUp}
                                inputRef={passwordRef}
                                style={{flex: "1", marginLeft: 48, marginRight: 12}}
                                id="outlined-error-helper-text"
                                label={invalidPassword ? t('error') : null}
                                placeholder={t('password')}
                                helperText={invalidPassword}
                                variant="outlined"
                                defaultValue={password !== "" ? password : undefined}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: "0 0 0 1000px white inset"
                                    }
                                }}
                                InputProps={{
                                    endAdornment: invalidPassword ? <AppErrorIcon/> : null
                                }}
                            />
                        </TableCellStyled>
                        <TableCellStyled>
                            <TextField
                                error={invalidPasswordConfirm}
                                disabled={processSignUp}
                                inputRef={passwordConfirmRef}
                                style={{flex: "1", marginLeft: 12, marginRight: 48}}
                                id="outlined-error-helper-text"
                                label={invalidPasswordConfirm ? t('error') : null}
                                placeholder={t('confirm')}
                                helperText={invalidPasswordConfirm}
                                variant="outlined"
                                defaultValue={passwordConfirm !== "" ? passwordConfirm : undefined}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: "0 0 0 1000px white inset"
                                    }
                                }}
                                InputProps={{
                                    endAdornment: invalidPasswordConfirm ? <AppErrorIcon/> : null
                                }}
                            />
                        </TableCellStyled>
                    </TableStyled>
                    <Typography variant="body2"
                                style={{marginLeft: 48,
                                    marginRight: 48,
                                    fontSize: 12,
                                    color: "red"}}>
                        {t('passwordText')}
                    </Typography>
                </div>
            </TableRowStyled>
            <TableRowStyled height={15} style={{marginTop: 48}}>
                <SpaceBetween>
                    < Button onClick={handleBack}
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