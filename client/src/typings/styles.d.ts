import 'styled-components'
import theme from '../src/styles/theme'

type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType { }
}
