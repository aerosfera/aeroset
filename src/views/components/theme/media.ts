import { generateMedia } from "styled-media-query";
import { defaultBreakpoints } from "styled-media-query";

//const media = generateMedia(defaultBreakpoints);
const media = generateMedia({
    huge: '1440px',
    large: '1170px',
    medium: '768px',
    small: '450px',
});

export default media