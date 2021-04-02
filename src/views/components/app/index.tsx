import React from "react";
import {withTheme} from "styled-components";
import {Area, AuthContainer, AppMainSection} from "./styles";
import {Hidden, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import HeaderPanel from "../layout/headerPanel";
import InstrumentalPanel from "../layout/instrumentalPanel";
import Scene from "../layout/scene";
import HeaderMobilePanel from "../layout/mobile/headerPanel";
import SnackbarContainer from "../snackbar";
import {AppDividerLight} from "../shared/style";
import Version from "../version";
import AuthPage from "../auth";
import {useSelector} from "react-redux";
import {isAuthenticatedSelector} from "../../../store/auth/authReducer";

const App: React.FC<{ theme: Theme }> = (_) => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);

    return (
        <section>
            <SnackbarContainer >
                <AppMainSection isAuthenticated={isAuthenticated}>
                    <Hidden smDown>
                        <div style={{position: "absolute", left: 8, top: 8}}>
                            <Version/>
                        </div>
                    </Hidden>
                    <Grid container
                          spacing={0}
                          alignItems="stretch"
                          direction={"column"}>
                        <Hidden smDown>
                            <Grid item xs={12}>
                                <HeaderPanel/>
                            </Grid>
                        </Hidden>
                        <Hidden mdUp>
                            <Grid item xs={12}>
                                <HeaderMobilePanel/>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12}>
                            <AppDividerLight/>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={12}>
                                <InstrumentalPanel/>
                            </Grid>
                        </Hidden>
                        <Hidden smDown>
                            <Grid item xs={12}>
                                <AppDividerLight/>
                            </Grid>
                        </Hidden>
                        <Grid item xs={12}>
                            <Area>
                                <Scene/>
                            </Area>
                        </Grid>
                    </Grid>
                </AppMainSection>
            </SnackbarContainer>
            <AuthContainer isAuthenticated={isAuthenticated}>
                <AuthPage/>
            </AuthContainer>
        </section>
    );
}

export default withTheme(App);