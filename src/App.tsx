import { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import Player from "./components/Player"
import TopBar from "./components/TopBar"
import Home from "./pages/Home"
import src from "./assets/如果当时 - 许嵩.flac"

const App: FC = (): ReactElement => {
  const [mySrc, setMySrc] = useState<string>(src)

  const handleNext = () => {

    setMySrc(
      "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"
    )
  }
  
  return (
    <AppContainer>
      <TopBar />
      <Home />
      <Player src={mySrc} handleNext={handleNext} />
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
`