import Scheme from "../../../../../models/scheme/Scheme";
import jsonEscape from "../../../../../utilities/string/jsonEscape";

export const parseSchemeFileAsync = (file: File): Promise<Scheme> => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            const fileText: string = <string>(reader.result)

            const jsonText = jsonEscape(fileText);
            const scheme: Scheme = JSON.parse(jsonText);
            resolve(scheme);
        };

        reader.onerror = reject;

        const blob: Blob = <Blob>file;
        reader.readAsText(blob);
    })
}