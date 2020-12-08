export default function calculateMinMaxOfArray(array : Array<number>) {
    const arrayLength = array.length;
    const borderIncrement = 10000;
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