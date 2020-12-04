import Scheme from "../../../../../models/scheme/Scheme";

function jsonEscape(str : string)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

export const parseSchemeFileAsync = (file: File) : Promise<Scheme> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            const fileText: string = <string>(reader.result)

            const scheme : Scheme = JSON.parse(jsonEscape(fileText));
            resolve(scheme);
        };

        reader.onerror = reject;

        const blob: Blob = <Blob>file;
        reader.readAsText(blob);
    })

    const reader: FileReader = new FileReader()
}