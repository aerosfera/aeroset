import React, {Component, useState} from 'react';
import {AppTheme} from "../../theme/theme";
import {withTheme} from "styled-components";

const StatePanel : React.FC<{ theme: AppTheme }> = (props) => {
    return (
        <div style={{background: "#0582ca", height: 30}}>
        </div>
    );
}

export default withTheme(StatePanel);