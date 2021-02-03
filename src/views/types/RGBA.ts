export class RGBA {
    public Red: number;
    public Green: number;
    public Blue: number;
    public Alpha: number;
    public CSSProperty: string;

    constructor(red: number, green: number, blue: number, alpha = 1) {
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
        this.Alpha = alpha;
        this.CSSProperty = 'rgba('
            + red + ','
            + green + ','
            + blue + ','
            + alpha + ') ';
    };

}