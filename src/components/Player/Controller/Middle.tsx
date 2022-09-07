import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { Button } from "../index.style"
import Slider from "../../Slider"
import audio from "../../../utils/Media"
import { useRecoilValue } from "recoil"
import { isPlayingState } from "../../../recoil"

interface IProps {
  audioObject: audio
  handlePlay: () => void
  handlePause: () => void
}

const Middle: FC<IProps> = ({
  audioObject,
  handlePlay,
  handlePause
}): ReactElement => {
  // const [isPlaying, setIsPlay] = useState<boolean>(false)
  const isPlaying = useRecoilValue(isPlayingState)

  

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
      <Slider type={audioObject} sWidth={`100%`} sPadding={`4px 0`} />
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
