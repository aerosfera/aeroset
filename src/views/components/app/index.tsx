import React from "react";
import {withTheme} from "styled-components";
import {Area, HR} from "./styles";
import {Hidden, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import HeaderPanel from "../layout/headerPanel";
import InstrumentalPanel from "../layout/instrumentalPanel";
import StatePanel from "../layout/statePanel";
import Scene from "../layout/scene";
import HeaderMobilePanel from "../layout/headerMobilePanel";

const useStyles = makeStyles((theme) => ({
    grid_item: {
        padding: 0,
        margin: 0,
    }
}));

const App: React.FC<{ theme: Theme }> = (_) => {
    const styles = useStyles();

    return (
        <Grid container
              spacing={0}
              alignItems="stretch"
              direction={"column"}>
            <Hidden smDown>
                <Grid item xs={12} className={styles.grid_item}>
                    <HeaderPanel/>
                </Grid>
            </Hidden>
            <Hidden mdUp>
                <Grid item xs={12} className={styles.grid_item}>
                    <HeaderMobilePanel/>
                </Grid>
            </Hidden>
            <Grid item xs={12} className={styles.grid_item}>
                <HR/>
            </Grid>
            <Hidden smDown>
                <Grid item xs={12} className={styles.grid_item}>
                    <InstrumentalPanel/>
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} className={styles.grid_item}>
                    <HR/>
                </Grid>
            </Hidden>
            <Grid item xs={12} className={styles.grid_item}>
                <Area>
                    <Scene/>
                </Area>
            </Grid>
            <Hidden smDown>
                <Grid item xs={12} className={styles.grid_item}>
                    <HR/>
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item xs={12} className={styles.grid_item}>
                    <StatePanel/>
                </Grid>
            </Hidden>
        </Grid>
    );
}

export default withTheme(App);