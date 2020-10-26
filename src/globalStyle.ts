import {createGlobalStyle} from 'styled-components'
import {normalize} from 'styled-normalize'

// noinspection Stylelint
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  
   body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: 'Roboto', 'Segoe UI',sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow:hidden;
    box-sizing: border-box;
  }

  code {
    font-family: source-code-pro, monospace;
  }
`