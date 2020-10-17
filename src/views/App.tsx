import React from 'react';
import './App.css';
import Scene from "./components/base/scene/Scene";
import StatePanel from "./components/base/statePanel/StatePanel";
import {InstrumentalPanel} from "./components/base/instrumentalPanel/InstrumentalPanel";
import HeaderPanel from "./components/base/headerPanel/HeaderPanel";
import {Grid, Col, Row} from 'react-styled-flexboxgrid'
import {ThemeProvider} from 'styled-components'
import {maxHeight} from "styled-system";

const theme = {
    flexboxgrid: {
        // Defaults
        gridSize: 12, // columns
        gutterWidth: 1, // rem
        outerMargin: 0, // rem
        mediaQuery: 'only screen',
        height: 1000,
        container: {
            sm: 46, // rem
            md: 61, // rem
            lg: 76  // rem
        },
        breakpoints: {
            xs: 0,  // em
            sm: 48, // em
            md: 64, // em
            lg: 75  // em
        }
    }
}

function App() {
    const {innerWidth: windowWidth, innerHeight: windowHeight} = window;

    return (
        <div style={{height: '100%'}}>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </div>
    );
}

export default App;
