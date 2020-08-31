import React, {Component} from 'react';
import * as BABYLON from 'babylonjs';
import chooseFiles from 'choose-files';

class Scene3D extends Component {
    static foo = "foo";
    static boo; //undefined

    foo;


    constructor(props) {
        super(props);
        this.state = {useWireFrame: false, shouldAnimate: false};
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

            this.setupPcs(array);
        };
        reader.readAsText(e.target.files[0])
    }


    async componentDidMount() {
        this.SetupScene();
        this.SetupCamera();
        //this.inputElement.style.visibility = 'hidden';
        this.inputElement.click();
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    setupPcs(array) {
        let pcs = new BABYLON.PointsCloudSystem("pcs", 1, this.scene)

        const pMin = 0;//Math.min(...array.map(v => v[3]), 0);
        const pMax = 4;//Math.max(...array.map(v => v[3]), 5);

        const diff = pMax - pMin;

        let myfunc = function (particle, i, s) {
            let element = array[i];
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
        pcs.addPoints(array.length, myfunc);
        pcs.buildMeshAsync();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <input ref={input => this.inputElement = input} type="file" onChange={(e) => this.showFile(e)}/>
                <canvas
                    style={{width: window.innerWidth, height: window.innerHeight}}
                    ref={canvas => {
                        if (canvas != null)
                            this.canvas = canvas;
                    }}
                />
            </div>
        )
    }
}

export default Scene3D;