import React, {Component, useEffect, useState} from 'react';
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";
import {FooterContainer} from "./style";
import Progress from "../progress";

const StatePanel: React.FC<{ theme: Theme }> = (props) => {
    return (
        <FooterContainer>
            <Progress/>
        </FooterContainer>
    );
}

export default withTheme(StatePanel);