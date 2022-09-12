import React, { FC, ReactElement, useState, useEffect } from "react"
import styled from "styled-components"
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa"
import { Button } from "../index.style"
import Slider from "../../Slider"
import audio from "../../../utils/Media"
import { isPlayingState } from "../../../recoil/atom"
import {useRecoilValue} from 'recoil'
import {AudioState} from '../../../recoil/atom'
 
interface IProps {
  handlePlay: () => void
  handlePause: () => void
}

const Middle: FC<IProps> = ({
  handlePlay,
  handlePause
}): ReactElement => {
  // const [isPlaying, setIsPlay] = useState<boolean>(false)
  const isPlaying = useRecoilValue(isPlayingState)
  const state = useRecoilValue(AudioState)

  

  return (
    <MiddleButton>
      <ButtonBox>
        <Button>
          <FaStepBackward className="FaStepBackward" />
        </Button>
        <Button onClick={() => (state.isPlaying ? handlePause() : handlePlay())}>
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
      <Slider type={state.audio!} sWidth={`100%`} sPadding={`4px 0`} />
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
