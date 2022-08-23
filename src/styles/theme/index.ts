import { createGlobalStyle, DefaultTheme } from "styled-components"

export const LightTheme: DefaultTheme = {
  color_scheme: "light",

  primary_bgColor: "white",
  primary_color: "black",
  secondary_color: "#937dc2",

  search_bgColor: "#EAEDED",
  search_color: "black",
  hover_BgColor: "hsla(0deg 2% 72% / 22%)",
  nav_boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",

  modeButton_BorderColor: "#929292",
  modeButton_BgColor: "#f1f1f1",
  modeButton_hover_BorderColor: "#4a4a4a",

  controllerButton_color: "#937dc2"
}

export const DarkTheme: DefaultTheme = {
  color_scheme: "dark",

  primary_bgColor: "#202124",
  primary_color: "#C6C6C6",
  secondary_color: "#937dc2",

  search_bgColor: "#41413E",
  search_color: "#A1A1A1",
  hover_BgColor: "hsla(0 5% 77% / 10%)",

  nav_boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",

  modeButton_BorderColor: "#fffefe36",
  modeButton_BgColor: "#f5f5f521",
  modeButton_hover_BorderColor: "#919191",

  controllerButton_color: "inherit"
}

export const GlobalStyle = createGlobalStyle`
  html {
    color-scheme: ${props => props.theme.color_scheme};
  }

  button:focus{
    outline: none;
  }

  
`
