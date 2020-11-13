import React, {Suspense} from "react";
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
import {AppDividerLight} from "../shared/style";
import IoC from "../../../environment/ioc/IoC";
import VersionService from "../../../services/version/VersionService";
import {VERSION_SERVICE} from "../../../environment/ioc/ServiceTypes";
import {useTranslation} from "react-i18next";

const loadVersion = () => {
    const versionService = IoC.get<VersionService>(VERSION_SERVICE)
    return versionService.GetVersion()
    //return (<div>Hello World!</div>);
}

const App: React.FC<{ theme: Theme }> = (_) => {
    const {t} = useTranslation()
    return (
        <SnackbarContainer>
            <div style={{position: "absolute", left: 8, top: 8, color: "white"}}>
                {t('version')}
                : {loadVersion()}
            </div>
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
                <Hidden smDown>
                    <Grid item xs={12}>
                        <AppDividerLight/>
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