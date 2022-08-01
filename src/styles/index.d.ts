import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primary_bgColor: string
    primary_color: string

    search_bgColor: string
    search_color: string

    nav_hoverColor: string
    nav_boxShadow: string

    color_scheme: string
    
    controllerBtn_color?: string
  }
}