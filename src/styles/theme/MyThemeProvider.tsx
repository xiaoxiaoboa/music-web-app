import React, { FC, ReactElement, useState } from "react"
import { ThemeProvider } from "styled-components"
import { LightTheme, DarkTheme, GlobalStyle } from "."
import {RecoilState, RecoilValue, useRecoilValue} from 'recoil'
import { ThemeState } from "../../recoil/atom"

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
