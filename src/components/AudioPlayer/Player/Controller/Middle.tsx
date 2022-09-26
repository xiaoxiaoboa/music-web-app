import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { Button } from "../../../../styles/Button.style"
import Slider from "../../../Slider"
import { isPlayingState } from "../../../../recoil/atom"
import { useRecoilState, useRecoilValue } from "recoil"
import { AudioState } from "../../../../recoil/atom"
import useCurrentTime from "./Hooks/useCurrentTime"
import useDuration from "./Hooks/useDuration"

interface IProps {
  handlePlay: () => void
  handlePause: () => void
  prev: () => void
  next: () => void
}

const Middle: FC<IProps> = (props): ReactElement => {
  const { handlePlay, handlePause, prev, next } = props

  const state = useRecoilValue(AudioState)
  const [currentTime, strCurrentTime, setCurrentTime, getisInterActiveValue] =
    useCurrentTime(state.audio)
  const [duration, strDuration] = useDuration(state.audio)

  /* 拖拽媒体进度条的时候 */
  const dragging = (value: number, isInterActive?: boolean) => {
    if (isInterActive) {
      // const currentTime = Math.floor((value * state.duration) / 100)
      // setState((prev) => ({...prev, ...{currentTime}}))
      setCurrentTime(Math.floor((value * duration) / 100))
    }
  }

  return (
    <MiddleButton>
      <ButtonBox>
        <Button onClick={prev}>
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
        <Button onClick={next}>
          <FaStepForward className="FaStepForward" />
        </Button>
      </ButtonBox>
      <Slider
        media={state.audio}
        duration={{ num: duration, str: strDuration }}
        currentTime={{ num: currentTime, str: strCurrentTime }}
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
