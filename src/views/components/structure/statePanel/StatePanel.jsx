import React, {Component, useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

function StatePanel() {
    const [projectionType, setProjectionType] = useState("orthographic");

    const handleChange = (event) => {
        setProjectionType(event.target.name)
    };

    return (
        <div style={{background: "#0582ca", height: 30}}>
            <FormControl style={{display: "inline-block", left: 0, color: "white"}}>
                <InputLabel>projection</InputLabel>
                <Select
                    value={projectionType}
                    onChange={handleChange}>
                    <MenuItem value={"orthographic"}>orthographic</MenuItem>
                    <MenuItem value={"perspective"}>perspective</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default StatePanel;