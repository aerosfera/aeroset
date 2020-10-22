import {createGlobalStyle} from 'styled-components'
import {normalize} from 'styled-normalize'

// noinspection Stylelint
export const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto',-apple-system, BlinkMacSystemFont, 'Segoe UI' , 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow:hidden;
  }
  
  html, body, #root, .App {
    height: 100%;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`