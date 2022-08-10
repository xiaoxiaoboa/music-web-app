import React, { FC, ReactElement } from "react"
import styled from "styled-components"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { Button } from "../index.style"
import Slider from "../../Slider"

interface IProps {
  playing: boolean
  handlePlayClick: () => void
  handlePauseClick: () => void
}

const Middle: FC<IProps> = (props): ReactElement => {
  const { playing, handlePlayClick, handlePauseClick } = props

  return (
    <MiddleButton>
      <ButtonBox>
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
        <Button>
          <FaStepForward className="FaStepForward" />
        </Button>
      </ButtonBox>
      <Slider />

    </MiddleButton>
  )
}

export default Middle

const MiddleButton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`
