import React, { createContext, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './GlobalStyle'
import theme from './theme'

interface Props {
  children: any
}

interface StyleContextData {
  theme: typeof theme
}

const StyleContext = createContext<StyleContextData>({} as StyleContextData)

function StyleProvider ({ children }: Props) {
  return (
    <>
      <GlobalStyle  />
      <ThemeProvider theme={theme}>
        <StyleContext.Provider value={{ theme }}>
          {children}
        </StyleContext.Provider>
      </ThemeProvider>
    </>
  )
}

export const useTheme = () => useContext(StyleContext)

type Theme = typeof theme
export interface ThemeProps {
  theme: Theme
}

export default StyleProvider