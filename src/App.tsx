import { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import Player from "./components/Player"
import TopBar from "./components/TopBar"
import Home from "./pages/Home"
import src from "./assets/多远都要在一起 - G.E.M.邓紫棋.flac"

const App: FC = (): ReactElement => {
  const [mySrc, setMySrc] = useState<string>(src)

  const handleNext = () => {

    setMySrc(
      "https://music-web-app-iota.vercel.app/assets/Free%20Loop-%E5%8F%A3%E7%90%B4%E6%BC%94%E5%A5%8F.b696a464.mp3"
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