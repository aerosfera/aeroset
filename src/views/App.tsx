import React from 'react';
import './App.css';
import Scene from "./components/layout/scene/Scene";
import StatePanel from "./components/layout/statePanel/StatePanel";
import {InstrumentalPanel} from "./components/layout/instrumentalPanel/InstrumentalPanel";
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import {Route} from "react-router-dom";
import Version from "./components/version/version";
import Auth from "./components/auth/auth";
import HeaderPanel from "./components/layout/headerPanel";
import {AppTheme} from "./components/theme";

const App = (theme: AppTheme) => {
    return (
        <div style={{height: '100%'}}>
            {/*<Route exact path="/version" component={Version}/>*/}
            {/*<Route exact path="/auth" component={Auth}/>*/}
            <div>

                <Grid fluid={true}>
                    <Row>
                        <Col xs>
                            <HeaderPanel theme={theme} />
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
            </div>
        </div>
    );
}

export default App;
