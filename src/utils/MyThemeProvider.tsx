import React, { FC, ReactElement, useState } from "react"
import { ThemeProvider } from "styled-components"
import { LightTheme, DarkTheme, GlobalStyle } from "../styles/theme"
import {RecoilState, RecoilValue, useRecoilValue} from 'recoil'
import { ThemeState } from "../recoil"

interface IProps {
  children: ReactElement
}

const MyThemeProvider: FC<IProps> = ({ children }): ReactElement => {
  const themeMode = useRecoilValue(ThemeState)
  

  
  return (
    <ThemeProvider theme={themeMode ? DarkTheme : LightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

export default MyThemeProvider
