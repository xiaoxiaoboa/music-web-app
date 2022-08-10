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
import { useRecoilState } from "recoil"
import { AudioElementState } from "../../recoil"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"

const Player: FC = (): ReactElement => {
  const [audioElement, setAudioElement] = useRecoilState(AudioElementState)
  const [playing, setPlay] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  useEffect(() => {
    setAudioElement(
      () =>
        new audio(
          "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"
        )
    )
  }, [])

  /* 播放控制 */
  const handlePlayClick = (): void => {
    audioElement
      .play()
      .then(res => setPlay(() => !playing))
      .catch(err => console.log(err))
  }

  /* 暂停控制 */
  const handlePauseClick = (): void => {
    audioElement.pause()
    setPlay(() => !playing)
  }

  /* 静音控制 */
  const handleMutedClick = (): void => {
    audioElement.muted(!isMuted)
    setIsMuted(() => !isMuted)
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
          handlePlayClick={handlePlayClick}
          handlePauseClick={handlePauseClick}
        />
        <Right isMuted={isMuted} handleMutedClick={handleMutedClick} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
