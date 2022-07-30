import React, { FC, ReactElement, useState } from "react"
import { ThemeProvider } from "styled-components"
import { LightTheme, DarkTheme, GlobalStyle } from "../styles/theme"
import {useRecoilValue} from 'recoil'
import {state} from '../recoil'

interface IProps {
  children: ReactElement
}

const MyThemeProvider: FC<IProps> = ({ children }): ReactElement => {
  const themeMode= useRecoilValue(state)

  
  return (
    <ThemeProvider theme={themeMode ? DarkTheme : LightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

export default MyThemeProvider
