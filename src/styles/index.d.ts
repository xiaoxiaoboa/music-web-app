import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    color_scheme: string

    primary_bgColor: string
    primary_color: string
    secondary_color: string

    search_bgColor: string
    search_color: string

    hover_BgColor: string

    nav_boxShadow: string

    modeButton_BorderColor: string
    modeButton_BgColor: string
    modeButton_hover_BorderColor: string

    controllerButton_color: string
  }
}
