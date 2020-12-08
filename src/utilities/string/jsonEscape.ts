const jsonEscape = (str: string) => {
    return str.replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "");
}

export default jsonEscape