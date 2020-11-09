import React from "react";
import {withTheme} from "styled-components";
import {Area} from "./styles";
import {Divider, Hidden, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import HeaderPanel from "../layout/headerPanel";
import InstrumentalPanel from "../layout/instrumentalPanel";
import StatePanel from "../layout/statePanel";
import Scene from "../layout/scene";
import HeaderMobilePanel from "../layout/mobile/headerPanel";
import SnackbarContainer from "../snackbar";
import {AppDivider} from "../shared/style";

const App: React.FC<{ theme: Theme }> = (_) => {
    return (
        <SnackbarContainer>
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
                    <AppDivider/>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={12}>
                        <InstrumentalPanel/>
                    </Grid>
                </Hidden>
                <Hidden smDown>
                    <Grid item xs={12}>
                        <AppDivider/>
                    </Grid>
                </Hidden>
                <Grid item xs={12}>
                    <Area>
                        <Scene/>
                    </Area>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={12}>
                        <AppDivider/>
                    </Grid>
                </Hidden>
                <Hidden smDown>
                    <Grid item xs={12}>
                        <StatePanel/>
                    </Grid>
                </Hidden>
            </Grid>
        </SnackbarContainer>
    );
}

export default withTheme(App);