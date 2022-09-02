import { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import Player from "./components/Player"
import TopBar from "./components/TopBar"
import Routes from "./routes"
import src from "./assets/如果当时 - 许嵩.flac"

const App: FC = (): ReactElement => {
  const [mySrc, setMySrc] = useState<string>(src)

  return (
    <AppContainer>
      <TopBar />
      <MainContainer>
        <Routes />
      </MainContainer>
      <Player src={mySrc} />
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction:column;
  overflow-y: auto;
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  user-select: none;
`
