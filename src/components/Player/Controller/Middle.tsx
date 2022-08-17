import React, { FC, ReactElement, useState } from "react"
import styled from "styled-components"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { Button } from "../index.style"
import Slider from "../../Slider"
import audio from "../../../utils/Media"
import useDuration from "../../Slider/Hooks/useDuration"
import useCurrentTime from "../../Slider/Hooks/useCurrentTime"

interface IProps {
  audioObject: audio
}

const Middle: FC<IProps> = ({ audioObject }): ReactElement => {
  const [isPlaying, setIsPlay] = useState<boolean>(false)

  /* 播放控制 */
  const handlePlay = (): void => {
    audioObject
      .play()
      .then(res => setIsPlay(() => !isPlaying))
      .catch(err => console.log(err))
  }

  /* 暂停控制 */
  const handlePause = (): void => {
    audioObject.pause()
    setIsPlay(() => !isPlaying)
  }

  return (
    <MiddleButton>
      <ButtonBox>
        <Button>
          <FaStepBackward className="FaStepBackward" />
        </Button>
        <Button onClick={() => (isPlaying ? handlePause() : handlePlay())}>
          {isPlaying ? (
            <FaPause className="FaPause" />
          ) : (
            <FaPlay className="FaPlay" />
          )}
        </Button>
        <Button>
          <FaStepForward className="FaStepForward" />
        </Button>
      </ButtonBox>
      <Slider
        type={audioObject}
        sWidth={`100%`}
        sPadding={`4px 0`}
        getSliderValue={() => {}}
      />
    </MiddleButton>
  )
}

export default Middle

const MiddleButton = styled.div`
  flex: 1.1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.9375rem;
`
