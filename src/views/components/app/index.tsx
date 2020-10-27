import React from "react";
import {withTheme} from "styled-components";
import {AppTheme} from "../theme/theme";
import {Area, Container, Footer, Header, HeaderContainer, HR, Panel} from "./styles";
import Scene from "../layout/scene";

const App: React.FC<{ theme: AppTheme }> = (_) => {
    return (
        <Container>
            <HeaderContainer>
                <Header/>
                <HR/>
                <Panel/>
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