export default class SolidPoint {

    private _x: number = 0;
    get x() {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    private _y: number = 0;
    get y() {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    private _z: number = 0;
    get z() {
        return this._z;
    }

    set z(value: number) {
        this._z = value;
    }

    private _parameter: number = 0;
    get parameter() {
        return this._parameter;
    }

    set parameter(value: number) {
        this._parameter = value;
    }

    constructor(x: number, y: number, z: number, parameter: number) {
        if (x < 0) {
            throw new Error("wrong parameters");
        }
        if (y < 0) {
            throw new Error("wrong parameters");
        }
        if (z < 0) {
            throw new Error("wrong parameters");
        }
        this._x = x;
        this._y = y;
        this._z = z;
        this._parameter = parameter;
    }
}