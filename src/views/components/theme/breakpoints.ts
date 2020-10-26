import { generateMedia } from "styled-media-query";

const breakpoints = generateMedia({
    small: '450px',
    medium: '768px',
    large: '1170px',
    huge: '1440px',
});

export default breakpoints