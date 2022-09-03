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

import MyAudio from "../../utils/MyAudio"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"



const Player: FC = (): ReactElement => {
  const audioElement = useRef(new MyAudio(''))
  // useEffect(() => {
  //   audioElement.current.value.src = src
  // }, [src])

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
        <Middle audioObject={audioElement.current!} />
        <Right mediaObject={audioElement.current!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
