import React, {Component} from 'react';
//import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import * as BABYLON from 'babylonjs';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {createMuiTheme} from '@material-ui/core/styles';
import {
    withStyles,
    MuiThemeProvider
} from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import * as eventTypes from "../../../../constants/eventTypes/EventTypes";

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


function CalculateMinMaxOfArray(array) {
    const arrayLength = array.length;
    const borderIncrement = 125000;
    let arrayCounter = 0;
    let lastBottomBorder = 0;
    let lastTopBorder = borderIncrement;
    let minValue = 0;
    let maxValue = 0;

    while (true) {
        const arrayPart = array.slice(lastBottomBorder, lastTopBorder)

        let min = Math.min(...arrayPart);
        let max = Math.max(...arrayPart);

        minValue = min < minValue ? min : minValue;
        maxValue = max > maxValue ? max : maxValue;

        lastBottomBorder += borderIncrement;
        lastTopBorder += borderIncrement;
        arrayCounter += arrayPart.length;

        if (arrayCounter >= arrayLength)
            break;
    }

    return {min: minValue, max: maxValue};
}


class Scene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterXFromLimit: -5,
            filterXToLimit: 5,
            filterYFromLimit: -5,
            filterYToLimit: 5,
            filterZFromLimit: -5,
            filterZToLimit: 5
        };
    }

    SetupScene() {

        if (!isCanvasSupported()) {
            console.log('canvas is not supported!');
            alert('canvas is not supported!');
        }

        const engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color3(0 / 255, 166 / 255, 251 / 255);
        this.engine = engine;
    }

    SetupCamera() {
        // const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 0, 150, BABYLON.Vector3.Zero(), this.scene);
        // //camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        // camera.attachControl(this.canvas, true);
        // this.camera = camera;

        this.camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, -100, new BABYLON.Vector3(1, 2, -3), this.scene);
        resetCameraZoom(this.camera, this.canvas);

        //this.scene.createDefaultCameraOrLight(true);
        this.scene.activeCamera.attachControl(this.canvas, false);
        this.scene.activeCamera.alpha += Math.PI; // camera +180°

        this.totalZoom = 0;
        this.scene.onPointerObservable.add(({event}) => {
            const delta = (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail || event.deltaY)))) * 0.9;
            if (delta > 0 && this.totalZoom < 14 || delta < 0) {
                this.totalZoom += delta;
                zoom2DView(this.camera, delta);
            }
        }, BABYLON.PointerEventTypes.POINTERWHEEL);

        this.scene.onPointerObservable.add(() => {
            zoomTarget = BABYLON.Vector3.Unproject(
                new BABYLON.Vector3(this.scene.pointerX, this.scene.pointerY, 0),
                this.engine.getRenderWidth(),
                this.engine.getRenderHeight(),
                this.camera.getWorldMatrix(),
                this.camera.getViewMatrix(),
                this.camera.getProjectionMatrix()
            );
        }, BABYLON.PointerEventTypes.POINTERMOVE);


        // lock the camera's placement, zooming is done manually in orthographic mode.
        // Locking this fixes strange issues with Hemispheric Light
        this.camera.lowerRadiusLimit = this.camera.radius;
        this.camera.upperRadiusLimit = this.camera.radius;

        // This attaches the camera to the canvas
        this.camera.attachControl(this.canvas, true, false, 0);
        this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;


        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
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

            this.points = array.map((e) => {
                return {
                    x: Number.parseFloat(e[0] ? e[0].replace(',', '.') : 0),
                    y: Number.parseFloat(e[1] ? e[1].replace(',', '.') : 0),
                    z: Number.parseFloat(e[2] ? e[2].replace(',', '.') : 0),
                    p: new Number(e[3] ? e[3].replace(',', '.') : 0)
                }
            });

            const parameters = this.points.map(p => p.p);
            const {max, min} = CalculateMinMaxOfArray(parameters);
            this.parameterMin = min;
            this.parameterMax = max;

            await this.SetupPcs(this.points);
        };
        reader.readAsText(e.target.files[0])
    }


    async componentDidMount() {
        this.SetupScene();
        this.SetupCamera();
        //AddControls(this.scene, this.camera);

        this.ShowAxis(5);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    cloudPointsFileLoaded(filePath) {
        alert(filePath);
    }

    ShowAxis(size) {
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

    async SetupPcs(points) {
        this.pointsCloudSystem = new BABYLON.PointsCloudSystem("pcs", this.scene);
        const diffP = this.parameterMax - this.parameterMin;

        const filteredPoints = points.filter(p => {
            const {x, y, z} = p

            if ((x >= this.state.filterXFromLimit && x <= this.state.filterXToLimit)
                &&
                (y >= this.state.filterYFromLimit && y <= this.state.filterYToLimit)
                &&
                (z >= this.state.filterZFromLimit && z <= this.state.filterZToLimit)) {
                return true;
            }

            return false;
        });

        let constructParticle = (particle, i, _) => {
            let point = filteredPoints[i];
            const pPercent = ((point.p - this.parameterMin) / diffP) * 100;

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

            particle.position = new BABYLON.Vector3(point.x, point.y, point.z);
            particle.color = new BABYLON.Color3(r / 255, g / 255, b / 255)
        }

        this.pointsCloudSystem.addPoints(filteredPoints.length, constructParticle);
        await this.pointsCloudSystem.buildMeshAsync();
    }

    componentWillUnmount() {
    }

    InputOnChangeHandle(event) {
        const target = event.target;
        const inputType = target.name;
        const value = target.value;

        const constructNewFilteredPCS = async () => {
            if (this.pointsCloudSystem !== undefined) {
                this.pointsCloudSystem.dispose();
            }

            if (typeof this.points !== 'undefined' && this.points)
                await this.SetupPcs(this.points);
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
                <canvas
                    style={{
                        outline: "none",
                        display: "block", //remove scrollBars,
                        margin: 0,
                        width: '100%',
                        padding: 0,
                        height: (window.innerHeight - 130)
                    }}
                    ref={canvas => {
                        if (canvas != undefined && canvas) {
                            this.canvas = canvas;
                            //const context = canvas.getContext('2d');
                            // const ctx = canvas.getContext('2d')
                            // ctx.fillStyle = "blue";
                            // ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                        }
                    }}
                />

                {/*<FiltersContainer style={{top: 20, left: 20}}>*/}
                {/*    <Button*/}
                {/*        disableElevation*/}
                {/*        variant="outlined"*/}
                {/*        startIcon={<CloudUploadIcon/>}*/}
                {/*        style={{marginBottom: 24}}*/}
                {/*        component="label"*/}
                {/*        color="primary">*/}
                {/*        Upload File*/}
                {/*        <input*/}
                {/*            type="file"*/}
                {/*            ref={input => this.inputElement = input}*/}
                {/*            onChange={(e) => this.showFile(e)}*/}
                {/*            style={{display: "none"}}*/}
                {/*        />*/}
                {/*    </Button>*/}
                {/*    <Typography variant="h5">FILTERS</Typography>*/}
                {/*    <div style={{marginTop: 16}}>*/}
                {/*        <TextField*/}
                {/*            id="outlined-number"*/}
                {/*            label="X FROM"*/}
                {/*            type="number"*/}
                {/*            name={"x-from"}*/}
                {/*            step="0.1"*/}
                {/*            value={this.state.filterXFromLimit}*/}
                {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
                {/*            style={{width: 100, height: 20}}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            inputProps={{*/}
                {/*                step: 0.1*/}
                {/*            }}*/}
                {/*            variant="outlined"*/}
                {/*        />*/}
                {/*        <TextField*/}
                {/*            id="outlined-number"*/}
                {/*            label="X TO"*/}
                {/*            type="number"*/}
                {/*            name={"x-to"}*/}
                {/*            step="0.1"*/}
                {/*            value={this.state.filterXToLimit}*/}
                {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
                {/*            style={{width: 100, marginLeft: 24}}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            inputProps={{*/}
                {/*                step: 0.1*/}
                {/*            }}*/}
                {/*            variant="outlined"/>*/}
                {/*    </div>*/}
                {/*    <div style={{marginTop: 12}}>*/}
                {/*        <TextField*/}
                {/*            id="outlined-number"*/}
                {/*            label="Y FROM"*/}
                {/*            type="number"*/}
                {/*            name={"y-from"}*/}
                {/*            step="0.1"*/}
                {/*            value={this.state.filterYFromLimit}*/}
                {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
                {/*            style={{width: 100, height: 20}}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            inputProps={{*/}
                {/*                step: 0.1*/}
                {/*            }}*/}
                {/*            variant="outlined"*/}
                {/*        />*/}
                {/*        <TextField*/}
                {/*            id="outlined-number"*/}
                {/*            label="Y TO"*/}
                {/*            type="number"*/}
                {/*            name={"y-to"}*/}
                {/*            step="0.1"*/}
                {/*            value={this.state.filterYToLimit}*/}
                {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
                {/*            style={{width: 100, marginLeft: 24}}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            inputProps={{*/}
                {/*                step: 0.1*/}
                {/*            }}*/}
                {/*            variant="outlined"/>*/}
                {/*    </div>*/}
                {/*    <div style={{marginTop: 12}}>*/}
                {/*        <TextField*/}
                {/*            id="outlined-number"*/}
                {/*            label="Z FROM"*/}
                {/*            type="number"*/}
                {/*            name={"z-from"}*/}
                {/*            step="0.1"*/}
                {/*            value={this.state.filterZFromLimit}*/}
                {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
                {/*            style={{width: 100, height: 20}}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true*/}
                {/*            }}*/}
                {/*            inputProps={{*/}
                {/*                step: 0.1*/}
                {/*            }}*/}
                {/*            variant="outlined"*/}
                {/*        />*/}
                {/*        <TextField*/}
                {/*            id="outlined-number"*/}
                {/*            label="Z TO"*/}
                {/*            type="number"*/}
                {/*            name={"z-to"}*/}
                {/*            step="0.1"*/}
                {/*            value={this.state.filterZToLimit}*/}
                {/*            onChange={this.InputOnChangeHandle.bind(this)}*/}
                {/*            style={{width: 100, marginLeft: 24}}*/}
                {/*            InputLabelProps={{*/}
                {/*                shrink: true,*/}
                {/*            }}*/}
                {/*            inputProps={{*/}
                {/*                step: 0.1*/}
                {/*            }}*/}
                {/*            variant="outlined"/>*/}
                {/*    </div>*/}
                {/*</FiltersContainer>*/}
            </MuiThemeProvider>
        )
    }
}

function isCanvasSupported() {
    const elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

/** Add map-like controls to an ArcRotate camera.
 * @param {BABYLON.Scene} scene
 * @param {module:babylonjs/Cameras/arcRotateCamera.ArcRotateCamera} camera
 */
function AddControls(scene, camera) {

    camera.inertia = 0.2;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 350;
    // camera.upperBetaLimit = Math.PI / 2 - 0.1;
    camera.angularSensibilityX = camera.angularSensibilityY = 500;

    const plane =
        BABYLON.Plane.FromPositionAndNormal(BABYLON.Vector3.Zero(), BABYLON.Axis.Y);

    const inertialPanning = BABYLON.Vector3.Zero();

    /** @type {BABYLON.Vector3} */
    let initialPos;
    const panningFn = () => {
        return;
        const pos = getPosition(scene, camera, plane);
        panning(pos, initialPos, camera.inertia, inertialPanning);
    };

    const inertialPanningFn = () => {
        if (inertialPanning.x !== 0 || inertialPanning.y !== 0 || inertialPanning.z !== 0) {
            camera.target.addInPlace(inertialPanning);
            inertialPanning.scaleInPlace(camera.inertia);
            zeroIfClose(inertialPanning);
        }
    };

    const wheelPrecisionFn = () => {
        camera.wheelPrecision = 1 / camera.radius * 1000;
    };

    const zoomFn = (p, e) => {
        const delta = zoomWheel(p, e, camera);
        zooming(delta, scene, camera, plane, inertialPanning);
    }

    const prvScreenPos = BABYLON.Vector2.Zero();
    const rotateFn = () => {
        return;
        rotating(scene, camera, prvScreenPos);
    };

    const removeObservers = () => {
        scene.onPointerObservable.removeCallback(panningFn);
        scene.onPointerObservable.removeCallback(rotateFn);
    }

    scene.onPointerObservable.add((p, e) => {
        removeObservers();
        if (p.event.button === 0) {
            initialPos = getPosition(scene, camera, plane);
            scene.onPointerObservable.add(panningFn, BABYLON.PointerEventTypes.POINTERMOVE);
        } else {
            prvScreenPos.copyFromFloats(scene.pointerX, scene.pointerY);
            scene.onPointerObservable.add(rotateFn, BABYLON.PointerEventTypes.POINTERMOVE);
        }
    }, BABYLON.PointerEventTypes.POINTERDOWN);

    scene.onPointerObservable.add((p, e) => {
        removeObservers();
    }, BABYLON.PointerEventTypes.POINTERUP);

    scene.onPointerObservable.add(zoomFn, BABYLON.PointerEventTypes.POINTERWHEEL);

    scene.onBeforeRenderObservable.add(inertialPanningFn);
    scene.onBeforeRenderObservable.add(wheelPrecisionFn);

    // stop context menu showing on canvas right click
    scene.getEngine().getRenderingCanvas().addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}

/** Get pos on plane.
 * @param {BABYLON.Scene} scene
 * @param {BABYLON.ArcRotateCamera} camera
 * @param {BABYLON.Plane} plane
 */
function getPosition(scene, camera, plane) {
    return null;
    const ray = scene.createPickingRay(
        scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera, false);
    const distance = ray.intersectsPlane(plane);

    // not using this ray again, so modifying its vectors here is fine
    return distance !== null ?
        ray.origin.addInPlace(ray.direction.scaleInPlace(distance)) : null;
}

/** Return offsets for inertial panning given initialize and current
 * pointer positions.
 * @param {BABYLON.Vector3} newPos
 * @param {BABYLON.Vector3} initialPos
 * @param {number} inertia
 * @param {BABYLON.Vector3} ref
 */
function panning(newPos, initialPos, inertia, ref) {
    const directionToZoomLocation = initialPos.subtract(newPos);
    const panningX = directionToZoomLocation.x * (1 - inertia);
    const panningZ = directionToZoomLocation.z * (1 - inertia);
    ref.copyFromFloats(panningX, 0, panningZ);
    return ref;
};

/** Get the wheel delta divided by the camera wheel precision.
 * @param {BABYLON.PointerInfoPre} p
 * @param {BABYLON.EventState} e
 * @param {BABYLON.ArcRotateCamera} camera
 */
function zoomWheel(p, e, camera) {
    const event = p.event;
    event.preventDefault();
    let delta = event.wheelDelta;
    //if (event.deltaY) {
    //    delta = -event.deltaY;
    //} else if (event.wheelDelta) {
    //    delta = event.wheelDelta;
    //} else if (event.detail) {
    //    delta = -event.detail;
    //}
    delta /= camera.wheelPrecision;
    return delta;
}

/** Zoom to pointer position. Zoom amount determined by delta.
 * @param {number} delta
 * @param {BABYLON.Scene} scene
 * @param {BABYLON.ArcRotateCamera} camera
 * @param {BABYLON.Plane} plane
 * @param {BABYLON.Vector3} ref
 */
function zooming(delta, scene, camera, plane, ref) {
    // if (camera.radius - camera.lowerRadiusLimit < 1 && delta > 0) {
    //     return;
    // } else if (camera.upperRadiusLimit - camera.radius < 1 && delta < 0) {
    //     return;
    // }
    const inertiaComp = 1 - camera.inertia;
    if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp < camera.lowerRadiusLimit) {
        delta = (camera.radius - camera.lowerRadiusLimit) * inertiaComp - camera.inertialRadiusOffset;
    } else if (camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp >
        camera.upperRadiusLimit) {
        delta = (camera.radius - camera.upperRadiusLimit) * inertiaComp - camera.inertialRadiusOffset;
    }

    const zoomDistance = delta / inertiaComp;
    const ratio = zoomDistance / camera.radius;
    const vec = getPosition(scene, camera, plane);

    if (vec !== undefined && vec) {
        const directionToZoomLocation = vec.subtract(camera.target);
        const offset = directionToZoomLocation.scale(ratio);
        offset.scaleInPlace(inertiaComp);
        ref.addInPlace(offset);
    }
    camera.inertialRadiusOffset += delta;
}

/** Rotate the camera
 * @param {BABYLON.Scene} scene
 * @param {BABYLON.Vector2} prvScreenPos
 * @param {BABYLON.ArcRotateCamera} camera
 */
function rotating(scene, camera, prvScreenPos) {
    const offsetX = scene.pointerX - prvScreenPos.x;
    const offsetY = scene.pointerY - prvScreenPos.y;
    prvScreenPos.copyFromFloats(scene.pointerX, scene.pointerY);
    changeInertialAlphaBetaFromOffsets(offsetX, offsetY, camera);
}

/** Modifies the camera's inertial alpha and beta offsets.
 * @param {number} offsetX
 * @param {number} offsetY
 * @param {BABYLON.ArcRotateCamera} camera
 */
function changeInertialAlphaBetaFromOffsets(offsetX, offsetY, camera) {
    const alphaOffsetDelta = offsetX / camera.angularSensibilityX;
    const betaOffsetDelta = offsetY / camera.angularSensibilityY;
    camera.inertialAlphaOffset -= alphaOffsetDelta;
    camera.inertialBetaOffset -= betaOffsetDelta;
}

/** Sets x y or z of passed in vector to zero if less than Epsilon.
 * @param {BABYLON.Vector3} vec
 */
function zeroIfClose(vec) {
    if (Math.abs(vec.x) < BABYLON.Epsilon) {
        vec.x = 0;
    }
    if (Math.abs(vec.y) < BABYLON.Epsilon) {
        vec.y = 0;
    }
    if (Math.abs(vec.z) < BABYLON.Epsilon) {
        vec.z = 0;
    }
}


const setTopBottomRatio = (camera, canvas) => {
    const ratio = canvas.height / canvas.width;
    camera.orthoTop = camera.orthoRight * ratio;
    camera.orthoBottom = camera.orthoLeft * ratio;
};
let zoomTarget = null;
const zoom2DView = async (camera, delta) => {
    const zoomingOut = delta < 0;

    if (zoomTarget) {
        const totalX = Math.abs(camera.orthoLeft - camera.orthoRight);
        const totalY = Math.abs(camera.orthoTop - camera.orthoBottom);

        const aspectRatio = totalY / totalX;

        {
            const fromCoord = camera.orthoLeft - zoomTarget.x;
            const ratio = fromCoord / totalX;
            camera.orthoLeft -= ratio * delta;
        }

        {
            const fromCoord = camera.orthoRight - zoomTarget.x;
            const ratio = fromCoord / totalX;
            camera.orthoRight -= ratio * delta;
        }

        {
            const fromCoord = camera.orthoTop - zoomTarget.y;
            const ratio = fromCoord / totalY;
            camera.orthoTop -= ratio * delta * aspectRatio;
        }

        {
            const fromCoord = camera.orthoBottom - zoomTarget.y;
            const ratio = fromCoord / totalY;
            camera.orthoBottom -= ratio * delta * aspectRatio;
        }

        // decrease pan sensitivity the closer the zoom level.
        camera.panningSensibility = 6250 / Math.abs(totalX / 2);
    }
};

const resetCameraZoom = (camera, canvas) => {
    camera.setPosition(new BABYLON.Vector3(0, 0, -100));
    camera.target = new BABYLON.Vector3(0, 0, 0);
    camera.orthoLeft = -8;
    camera.orthoRight = 8;

    setTopBottomRatio(camera, canvas);
};

const FiltersContainer = styled(Card)`
 padding: 1em;
 background: ${theme.palette.background};
 width: 250px; 
 height: 320px;
 position: absolute;
 `;

export default Scene;