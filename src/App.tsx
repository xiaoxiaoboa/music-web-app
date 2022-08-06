import { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import Player from "./components/Player"
import TopBar from "./components/TopBar"
import Home from "./pages/Home"

const App: FC = (): ReactElement => {
  return (
    <AppContainer>
      <TopBar />
      <Home />
      <Player />
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
`