import React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as AeroLogoSVG} from '../../../../assets/images/aero_logo.svg';
import {useTranslation} from "react-i18next";
import withTheme from "@material-ui/core/styles/withTheme";

const AerosetLogo: React.FC<{ theme: Theme }> = (props) => {
    const {t} = useTranslation();

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item>
                <AeroLogoSVG/>
            </Grid>
            <Grid item>
                <Typography style={{marginLeft: 8}} variant="h5">
                    {t('aeroset')}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default withTheme(AerosetLogo);