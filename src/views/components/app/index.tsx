import React from "react";
import {withTheme} from "styled-components";
import {AppTheme} from "../theme/theme";
import {Area, Container, Footer, Header, HR, Panel} from "./styles";

const App: React.FC<{ theme: AppTheme }> = (_) => {

    return (
        <Container>
            <Header/>
            {/*<HR/>*/}
            <Panel/>
            {/*<HR/>*/}
            <Area/>
            {/*<HR/>*/}
            <Footer/>
        </Container>
    );
}

export default withTheme(App);