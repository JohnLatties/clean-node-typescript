import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: '#373737';
}

body {
  background-color: #000000;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  overflow: hidden;
  height: 100%;
}
`
