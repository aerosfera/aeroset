import React, {Component, useState} from 'react';
import {withTheme} from "styled-components";
import {Theme} from "@material-ui/core";

const StatePanel : React.FC<{ theme: Theme }> = (props) => {
    return (
        <div style={{background: "#0582ca", height: 30}}>
        </div>
    );
}

export default withTheme(StatePanel);