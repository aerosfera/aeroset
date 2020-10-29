import React, {Suspense} from "react";
import {withTheme} from "styled-components";
import {Area, Container, Footer, Header, HeaderContainer, HR, Panel} from "./styles";
import Scene from "../layout/scene";
import InstrumentalPanel from "../layout/instrumentalPanel";
import {Theme} from "@material-ui/core";

const App: React.FC<{ theme: Theme }> = (_) => {
    return (
        <Container>
            <HeaderContainer>
                <Header/>
                <HR/>
                <Panel>
                    <InstrumentalPanel/>
                </Panel>
                <HR/>
            </HeaderContainer>
            <Area>
                <Scene/>
            </Area>
            <Footer>
                <HR/>
            </Footer>
        </Container>
    );
}

export default withTheme(App);