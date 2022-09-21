import { FC, ReactElement, Suspense } from "react"
import styled from "styled-components"
import AudioPlayer from "./components/AudioPlayer"
import TopBar from "./components/TopBar"
import Routes from "./routes"

const App: FC = (): ReactElement => {
  return (
    <AppContainer>
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
`
const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  user-select: none;
`
