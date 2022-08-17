import { FC, ReactElement, useEffect, useState } from "react"
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
import src from "../../assets/郑中基 - 答应不爱你.flac"

const Player: FC = (): ReactElement => {
  const [audioElement, setAudioElement] = useState<Audio>(new Audio(src))

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
        <Middle audioObject={audioElement!} />
        <Right mediaObject={audioElement!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
