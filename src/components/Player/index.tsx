import { FC, ReactElement, useEffect, useState, useRef } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  MiddleButton,
  SongCover,
  RightButton,
  Button,
  SongCoverImg,
  SongDetails,
  SongTitle,
  Artist,
  VolumeButtonBox
} from "./index.style"

import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"

import { RiVolumeUpFill, RiPlayListFill, RiHeart2Line } from "react-icons/ri"

import audio from "../../utils/audio"

const Player: FC = (): ReactElement => {
  const [playing, setPlay] = useState<Boolean>(false)
  const AudioRef = useRef(
    new audio(
      "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"
    )
  )


  const handlePlayClick = (): void => {
    AudioRef.current.play((rel: Boolean) =>
      rel ? setPlay(() => !playing) : console.log("播放失败")
    )
  }
  const handlePauseClick = (): void => {
    AudioRef.current.pause()
    setPlay(() => !playing)
  }

  const handleTest = (): void => {
  }

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
        <MiddleButton>
          <Button>
            <FaStepBackward className="FaStepBackward" />
          </Button>
          <Button
            onClick={() => (playing ? handlePauseClick() : handlePlayClick())}>
            {playing ? (
              <FaPause className="FaPause" />
            ) : (
              <FaPlay className="FaPlay" />
            )}
          </Button>
          <Button onClick={handleTest}>
            <FaStepForward className="FaStepForward" />
          </Button>
        </MiddleButton>
        <RightButton>
          <Button>
            <RiHeart2Line className="RiHeart2Line" />
          </Button>
          <Button>
            <RiPlayListFill className="RiPlayListFill" />
          </Button>
          <VolumeButtonBox>
            <Button>
              <RiVolumeUpFill className="RiVolumeUpFill" />
            </Button>
            <span></span>
          </VolumeButtonBox>
        </RightButton>
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
