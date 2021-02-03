import {RGBA} from "../RGBA";
import {ColorLabel} from "../ColorLabel";

export class Gradient {
    private _Name: string;
    private _BelowLimitColor: RGBA;
    private _AboveLimitColor: RGBA;
    private _Labels: ColorLabel[];

    get Labels(): ColorLabel[] {
        return this._Labels;
    }

    set Labels(value: ColorLabel[]) {
        this._Labels = value;
    }
    get AboveLimitColor(): RGBA {
        return this._AboveLimitColor;
    }

    set AboveLimitColor(value: RGBA) {
        this._AboveLimitColor = value;
    }
    get BelowLimitColor(): RGBA {
        return this._BelowLimitColor;
    }

    set BelowLimitColor(value: RGBA) {
        this._BelowLimitColor = value;
    }
    get Name(): string {
        return this._Name;
    }

    set Name(value: string) {
        this._Name = value;
    }

    protected constructor() {
        this._Name = "";
        this._BelowLimitColor = new RGBA(0, 0, 0);
        this._AboveLimitColor = new RGBA(0, 0, 0);
        this._Labels = [];
    }
}