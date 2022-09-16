import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { Button } from "../index.style"
import Slider from "../../Slider"
import audio from "../../../utils/Media"
import { isPlayingState } from "../../../recoil/atom"
import { useRecoilState } from "recoil"
import { AudioState } from "../../../recoil/atom"
import useCurrentTime from "./Hooks/useCurrentTime"
import useDuration from "./Hooks/useDuration"

interface IProps {
  handlePlay: () => void
  handlePause: () => void
}

const Middle: FC<IProps> = ({ handlePlay, handlePause }): ReactElement => {
  const [state, setState] = useRecoilState(AudioState)
  const [strCurrentTime, getisInterActiveValue] = useCurrentTime()
  const strDuration = useDuration()

  /* 拖拽媒体进度条的时候 */
  const dragging = (value: number, isInterActive?: boolean) => {
    if (isInterActive) {
      const currentTime = Math.floor((value * state.duration) / 100)
      setState((prev) => ({...prev, ...{currentTime}}))
      // state.audio.currentTime = currentTime
    }
  }


  return (
    <MiddleButton>
      <ButtonBox>
        <Button>
          <FaStepBackward className="FaStepBackward" />
        </Button>
        <Button
          onClick={() => (state.isPlaying ? handlePause() : handlePlay())}>
          {state.isPlaying ? (
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
        duration={strDuration}
        currentTime={strCurrentTime}
        type="media"
        sWidth={`100%`}
        sPadding={`4px 0`}
        getSliderValue={dragging}
        getisInterActiveValue={getisInterActiveValue}
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
