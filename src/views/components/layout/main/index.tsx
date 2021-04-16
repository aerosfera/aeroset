import React from "react";
import {Hidden, Switch, Theme} from "@material-ui/core";
import SnackbarContainer from "../../snackbar";
import {AppMainSection, Area, AuthContainer} from "../../app/styles";
import Version from "../../version";
import Grid from "@material-ui/core/Grid";
import HeaderPanel from "../headerPanel";
import HeaderMobilePanel from "../mobile/headerPanel";
import {AppDividerLight} from "../../shared/style";
import InstrumentalPanel from "../instrumentalPanel";
import Scene from "../scene";
import {withTheme} from "styled-components";

const Main: React.FC<{ theme: Theme }> = (_) => {
    return (
        <SnackbarContainer>
            <AppMainSection>
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
    );
}

export default withTheme(Main);