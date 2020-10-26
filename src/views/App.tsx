import React from 'react';
import Scene from "./components/layout/scene/Scene";
import StatePanel from "./components/layout/statePanel/StatePanel";
import {InstrumentalPanel} from "./components/layout/instrumentalPanel/InstrumentalPanel";
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import HeaderPanel from "./components/layout/headerPanel";
import {AppTheme} from "./components/theme/theme";
import {StyledProps, withTheme} from 'styled-components';

const App: React.FC<{ theme: AppTheme }> = (_) => {
    return (
        <React.Fragment>
            <Grid fluid={true}>
                <Row>
                    <Col xs>
                        <HeaderPanel/>
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <InstrumentalPanel/>
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <Scene/>
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <StatePanel/>
                    </Col>
                </Row>
            </Grid>
        </React.Fragment>
    );
}

export default withTheme(App);
