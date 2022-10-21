import { FC, ReactElement, Suspense, useEffect } from "react"
import styled from "styled-components"
import AudioPlayer from "./components/AudioPlayer"
import Snackbar from "./components/Snackbar"
import TopBar from "./components/TopBar"
import Routes from "./routes"

const App: FC = (): ReactElement => {
  return (
    <AppContainer>
      <Snackbar />
      <TopBar />
      <MainContainer>
        <Suspense fallback={""}>
          <Routes />
        </Suspense>
      </MainContainer>
      <AudioPlayer />
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
`
const MainContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  user-select: none;
`
