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
        <div style={{background: "#2a4158", height: 50}}>
            <FormControl style={{position: "absolute", right: 0, color: "white"}}>
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