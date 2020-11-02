import React, {Component, useState} from 'react';
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";
import {FooterContainer} from "./style";

const StatePanel: React.FC<{ theme: Theme }> = (props) => {
    return (
        <FooterContainer>
        </FooterContainer>
    );
}

export default withTheme(StatePanel);