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

import audio from "../../utils/audio"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"
import src from "../../assets/Free Loop-口琴演奏.mp3"

const Player: FC = (): ReactElement => {
  const [audioElement, setAudioElement] = useState(new audio(src))
  const [playing, setPlay] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  /* 播放控制 */
  const handlePlay = (): void => {
    audioElement
      ?.play()
      .then(res => setPlay(() => !playing))
      .catch(err => console.log(err))
  }

  /* 暂停控制 */
  const handlePause = (): void => {
    audioElement?.pause()
    setPlay(() => !playing)
  }

  /* 静音控制 */
  const handleMuted = (): void => {
    audioElement?.muted(!isMuted)
    setIsMuted(() => !isMuted)
  }

  /* 音量控制 */
  const handleVolume = (value: number): void => {
    audioElement?.volume(value)
    if (value === 0 && isMuted === false) {
      handleMuted()
    } else if (value > 0 && isMuted === true) {
      handleMuted()
    }
  }

  /* 测试 */
  const handleTest = (): void => {}

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
        <Middle
          playing={playing}
          handlePlay={handlePlay}
          handlePause={handlePause}
        />
        <Right
          isMuted={isMuted}
          handleMuted={handleMuted}
          handleVolume={handleVolume}
        />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
