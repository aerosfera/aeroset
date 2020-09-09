import React, {Component} from 'react';
import * as BABYLON from 'babylonjs';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {createMuiTheme} from '@material-ui/core/styles';
import {
    withStyles,
    MuiThemeProvider
} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

class Scene3D extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterXFromLimit: -10,
            filterXToLimit: 10,
            filterYFromLimit: -10,
            filterYToLimit: 10,
            filterZFromLimit: -10,
            filterZToLimit: 10
        };
    }

    SetupScene() {
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    }

    SetupCamera() {
        let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), this.scene);
        camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        camera.attachControl(this.canvas, true);
    }

    showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const array = [];
            const text = (e.target.result)
            let lines = text.split('\n');
            lines.forEach((line) => {
                let value = line.split(';');
                array.push(value);
            });

            this.pcsArray = array;
            await this.setupPcs(this.pcsArray);
        };
        reader.readAsText(e.target.files[0])
    }


    async componentDidMount() {
        this.SetupScene();
        this.SetupCamera();
        this.showAxis(5);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener("resize", function () {
            //this.engine.resize();
        });
    }

    showAxis(size) {
        const makeTextPlane = function (text, color, size, scene) {
            const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
            dynamicTexture.hasAlpha = true;
            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
            const plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
            plane.material.backFaceCulling = false;
            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
            plane.material.diffuseTexture = dynamicTexture;
            return plane;
        };

        const axisX = BABYLON.Mesh.CreateLines("axisX", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], this.scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);
        const xChar = makeTextPlane("X", "red", size / 10, this.scene);
        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
        const axisY = BABYLON.Mesh.CreateLines("axisY", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
        ], this.scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);
        const yChar = makeTextPlane("Y", "green", size / 10, this.scene);
        yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
        const axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
        ], this.scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
        const zChar = makeTextPlane("Z", "blue", size / 10, this.scene);
        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    };


    async setupPcs() {
        this.pcs = new BABYLON.PointsCloudSystem("pcs", 1, this.scene);

        const pMin = 0;//Math.min(...array.map(v => v[3]), 0);
        const pMax = 4;//Math.max(...array.map(v => v[3]), 5);

        const diff = pMax - pMin;

        const filteredArray = this.pcsArray.filter(e => {
            const {x, y, z} = {
                x: Number.parseFloat(e[0] ? e[0].replace(',', '.') : 0),
                y: Number.parseFloat(e[0] ? e[0].replace(',', '.') : 0),
                z: Number.parseFloat(e[0] ? e[0].replace(',', '.') : 0),
            }

            if (x == null || y == null || z == null)
                return false;

            if (this.state.filterXFromLimit > x || this.state.filterXToLimit < x)
                return false;

            if (this.state.filterYFromLimit > y || this.state.filterYToLimit < y)
                return false;

            if (this.state.filterZFromLimit > z || this.state.filterZToLimit < z)
                return false;

            return true;
        });

        let constructParticle = function (particle, i, _) {
            let element = filteredArray[i];
            const coordinates = {
                x: Number.parseFloat(element[0] ? element[0].replace(',', '.') : 0),
                y: Number.parseFloat(element[1] ? element[1].replace(',', '.') : 0),
                z: Number.parseFloat(element[2] ? element[2].replace(',', '.') : 0),
            }

            let p = element[3];

            function getColor(p, pMin, pMax) {

                p = Number.parseFloat(p ? p.replace(',', '.') : 0);
                const pPercent = ((p - pMin) / diff) * 100;

                let r;
                let g;
                let b;

                if (pPercent <= 0) {
                    r = 0;
                    g = 0;
                    b = 0;
                } else if (pPercent > 0 && pPercent <= 25) {
                    r = 255;
                    g = 0 - ((0 - 255) / (0 - 25)) * (0 - pPercent);
                    b = 0;
                } else if (pPercent > 25 && pPercent <= 50) {
                    r = 255 - ((255 - 0) / (25 - 50)) * (25 - pPercent);
                    g = 255;
                    b = 0;
                } else if (pPercent > 50 && pPercent <= 75) {
                    r = 0;
                    g = 255;
                    b = 0 - ((0 - 255) / (50 - 100)) * (50 - pPercent);
                } else if (pPercent > 75 && pPercent <= 100) {
                    r = 0;
                    g = 255 - ((255 - 0) / (75 - 100)) * (75 - pPercent);
                    b = 255;
                } else if (pPercent > 100) {
                    r = 0;
                    g = 0;
                    b = 0;
                }

                return {r, g, b};
            }

            const {r, g, b} = getColor(p, pMin, pMax);

            if (r > 255 || b > 255 || g > 255 || r < 0 || b < 0 || g < 0)
                console.log(`p = ${p}; r = ${r}, r = ${g}, b = ${b}`);

            if (r < 10 && g < 10 && b < 10)
                console.log(`p = ${p}; r = ${r}, r = ${g}, b = ${b}`);

            if (r === undefined || r === null || r === Number.NaN)
                console.log(" r is bad!")
            if (g === undefined || g === null || g === Number.NaN)
                console.log(" g is bad!")
            if (b === undefined || b === null || b === Number.NaN)
                console.log(" b is bad!")

            particle.position = new BABYLON.Vector3(coordinates.x, coordinates.y, coordinates.z);
            particle.color = new BABYLON.Color3(r / 255, g / 255, b / 255)
        }
        this.pcs.addPoints(filteredArray.length, constructParticle);
        await this.pcs.buildMeshAsync();
    }

    componentWillUnmount() {
    }

    handleChange(event) {
        const target = event.target;
        const inputType = target.name;
        const value = target.value;

        const constructNewFilteredPCS = () => {
            if (this.pcs !== undefined) {
                this.pcs.dispose();
            }
            this.setupPcs(this.pcsArray);
        }

        if (inputType === "x-from") {
            this.setState(prevState => ({
                filterXFromLimit: value,
                filterXToLimit: prevState.filterXToLimit,
                filterYFromLimit: prevState.filterYFromLimit,
                filterYToLimit: prevState.filterYToLimit,
                filterZFromLimit: prevState.filterZFromLimit,
                filterZToLimit: prevState.filterZToLimit,
            }), () => {
                constructNewFilteredPCS();
            });

        } else if (inputType === "x-to") {
            this.setState(prevState => ({
                filterXFromLimit: prevState.filterXFromLimit,
                filterXToLimit: value,
                filterYFromLimit: prevState.filterYFromLimit,
                filterYToLimit: prevState.filterYToLimit,
                filterZFromLimit: prevState.filterZFromLimit,
                filterZToLimit: prevState.filterZToLimit,
            }), () => {
                constructNewFilteredPCS();
            });
        } else if (inputType === "y-from") {
            this.setState(prevState => ({
                filterXFromLimit: prevState.filterXFromLimit,
                filterXToLimit: prevState.filterXToLimit,
                filterYFromLimit: value,
                filterYToLimit: prevState.filterYToLimit,
                filterZFromLimit: prevState.filterZFromLimit,
                filterZToLimit: prevState.filterZToLimit,
            }), () => {
                constructNewFilteredPCS();
            });
        } else if (inputType === "y-to") {
            this.setState(prevState => ({
                filterXFromLimit: prevState.filterXFromLimit,
                filterXToLimit: prevState.filterXToLimit,
                filterYFromLimit: prevState.filterYFromLimit,
                filterYToLimit: value,
                filterZFromLimit: prevState.filterZFromLimit,
                filterZToLimit: prevState.filterZToLimit,
            }), () => {
                constructNewFilteredPCS();
            });
        } else if (inputType === "z-from") {
            this.setState(prevState => ({
                filterXFromLimit: prevState.filterXFromLimit,
                filterXToLimit: prevState.filterXToLimit,
                filterYFromLimit: prevState.filterYFromLimit,
                filterYToLimit: prevState.filterYToLimit,
                filterZFromLimit: value,
                filterZToLimit: prevState.filterZToLimit,
            }), () => {
                constructNewFilteredPCS();
            });
        } else if (inputType === "z-to") {
            this.setState(prevState => ({
                filterXFromLimit: prevState.filterXFromLimit,
                filterXToLimit: prevState.filterXToLimit,
                filterYFromLimit: prevState.filterYFromLimit,
                filterYToLimit: prevState.filterYToLimit,
                filterZFromLimit: prevState.filterZFromLimit,
                filterZToLimit: value,
            }), () => {
                constructNewFilteredPCS();
            });
        }
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <input ref={input => this.inputElement = input} type="file" onChange={(e) => this.showFile(e)}/>
                    <canvas
                        style={{width: window.innerWidth, height: window.innerHeight, position: "relative"}}
                        ref={canvas => {
                            if (canvas != null)
                                this.canvas = canvas;
                        }}
                    />
                    <FiltersContainer>
                        <div>Axis filters:</div>
                        <div>
                            <div style={{display: "inline-block"}}>X: from</div>
                            <div style={{display: "inline-block", marginLeft: 5}}>
                                <input style={{width: 60}}
                                       step="0.1"
                                       type="number"
                                       name={"x-from"}
                                       value={this.state.filterXFromLimit}
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div style={{display: "inline-block", marginLeft: 5}}>to</div>
                            <div style={{display: "inline-block", marginLeft: 5}}>
                                <input style={{width: 60}}
                                       step="0.1"
                                       type="number"
                                       name={"x-to"}
                                       value={this.state.filterXToLimit}
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                        </div>
                        <div>
                            <div style={{display: "inline-block"}}>Y: from</div>
                            <div style={{display: "inline-block", marginLeft: 5}}>
                                <input style={{width: 60}}
                                       pattern="^-?[0-9]\d*\.?\d*$"
                                       type="number"
                                       name={"y-from"}
                                       value={this.state.filterYFromLimit}
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div style={{display: "inline-block", marginLeft: 5}}>to</div>
                            <div style={{display: "inline-block", marginLeft: 5}}>
                                <input style={{width: 60}}
                                       step="0.1"
                                       type="number"
                                       name={"y-to"}
                                       value={this.state.filterYToLimit}
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                        </div>
                        <div>
                            <div style={{display: "inline-block"}}>Z: from</div>
                            <div style={{display: "inline-block", marginLeft: 5}}>
                                <input style={{width: 60}}
                                       step="0.1"
                                       type="number"
                                       name={"z-from"}
                                       value={this.state.filterZFromLimit}
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div style={{display: "inline-block", marginLeft: 5}}>to</div>
                            <div style={{display: "inline-block", marginLeft: 5}}>
                                <input style={{width: 60}}
                                       step="0.1"
                                       type="number"
                                       name={"z-to"}
                                       value={this.state.filterZToLimit}
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                        </div>
                    </FiltersContainer>
                </div>
            </MuiThemeProvider>
        )
    }
}

const FiltersContainer = styled(Card)`
 padding: 4em;
 background: ${theme.palette.background};
 width: 300px; 
 `;

export default Scene3D;