import { createGlobalStyle, DefaultTheme } from "styled-components"

export const LightTheme: DefaultTheme = {
  color_scheme: 'light',
  primary_bgColor: "white",
  primary_color: "black",

  search_gbColor: "#EAEDED",
  search_color: "black",
  nav_hoverColor: "#9370DB",
  nav_boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px"
}

export const DarkTheme: DefaultTheme = {
  color_scheme: "dark",
  primary_bgColor: "#292c2f",
  primary_color: "#C6C6C6",

  search_gbColor: "#41413E",
  search_color: "#A1A1A1",
  nav_hoverColor: "#9370DB",
  nav_boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
}

export const GlobalStyle = createGlobalStyle`
  html {
    color-scheme: ${props => props.theme.color_scheme};
  }

  
`
