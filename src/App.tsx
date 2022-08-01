import { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import ControllerBar from "./components/ControllerBar"
import TopBar from "./components/TopBar"
import Home from "./pages/Home"

const App: FC = (): ReactElement => {
  return (
    <AppContainer>
      <TopBar />
      <Home />
      <ControllerBar />
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
`