import { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  SongCover,
  SongCoverImg,
  SongDetails,
  SongTitle,
  Artist
} from "./index.style"

import Audio from "../../utils/Audio"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"

interface IProps {
  src: string
  handleNext: () => void
}

const Player: FC<IProps> = ({ src, handleNext }): ReactElement => {
  // const [audioElement, setAudioElement] = useState<string>('')
  const audioElement = useRef(new Audio(src))

  useEffect(() => {
    audioElement.current.value.src = src
  }, [src])
  return (
    <ControllerBarContainer>
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg
            src="http://p1.music.126.net/KyBR4ZDYFlzQJE_uyvfjpA==/109951166118671647.jpg?param=130y130"
            alt=""
          />
          <SongDetails>
            <SongTitle>如果当时</SongTitle>
            <Artist>许嵩</Artist>
          </SongDetails>
        </SongCover>
        <Middle audioObject={audioElement.current!} handleNext={handleNext} />
        <Right mediaObject={audioElement.current!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
