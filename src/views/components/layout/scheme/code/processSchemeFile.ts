import {Scene} from "@babylonjs/core/scene";

export const processSchemeFile = (file: File, scene: Scene) => {
    const reader: FileReader = new FileReader()

    reader.onload = async (e: ProgressEvent<FileReader>) => {
        const fileText: string = <string>(reader.result)



        return;
    };

    const blob: Blob = <Blob>file;
    reader.readAsText(blob);
}