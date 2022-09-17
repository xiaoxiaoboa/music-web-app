import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Media from "../../utils/Media"
import useCurrentTime from "../Player/Controller/Hooks/useCurrentTime"
import useDrag from "./Hooks/useDrag"
import useDuration from "../Player/Controller/Hooks/useDuration"
import { useRecoilState, useRecoilValue } from "recoil"
import { isInterActiveState, AudioState } from "../../recoil/atom"

interface SliderProps {
  type?: string
  sWidth?: string
  sPadding?: string
  isMuted?: boolean
  getSliderValue?: (value: number, isInterActive?: boolean) => void
  currentTime?: string
  duration?: string
  getisInterActiveValue?: React.Dispatch<React.SetStateAction<boolean>>
}
enum Type {
  MEDIA = "media",
  VOLUME = "volume"
}

const Slider: FC<SliderProps> = (props): ReactElement => {
  /* Slider的值 */
  const state = useRecoilValue(AudioState)
  const [sliderValue, setSliderValue] = useState<number>(0)
  const TrackRef = useRef<HTMLDivElement>(null)

  const [isInterActive, handleMouseDown, handleMouseDrag] = useDrag({
    trackElement: TrackRef.current as HTMLDivElement,
    setSliderValue
  })

  useEffect(() => {
    if (isInterActive === false && props.type === Type.MEDIA) {
      const temp = state.currentTime / (Math.floor(state.duration) / 100)

      setSliderValue(() => parseFloat(temp.toFixed(1)))
    }
  }, [state.currentTime])

  useEffect(() => {
    if (props.type === Type.MEDIA) {
      props.getisInterActiveValue!(isInterActive)
    }
    if (isInterActive === false && props.type === Type.MEDIA) {
      const currentTime = Math.floor((sliderValue * state.duration) / 100)
      state.audio.currentTime = currentTime
    }
  }, [isInterActive])

  useEffect(() => {
    if (props.getSliderValue) {
      props.getSliderValue(sliderValue, isInterActive)
    }
  }, [sliderValue])

  useEffect(() => {
    /* 当静音时，音量条应该为0 */
    if (props.isMuted) {
      setSliderValue(0)
    }
    return () => {
      /*
        当取消静音时，音量条应该恢复静音前的值
        但是当之前的值为0时，则不需要恢复 
       */
      if (props.isMuted && sliderValue !== 0) {
        setSliderValue(sliderValue)
      }
    }
  }, [props.isMuted])

  return (
    <SliderContainer co={props}>
      {props?.currentTime ? <StartTime>{props?.currentTime}</StartTime> : <></>}
      <SliderTrack id="track" ref={TrackRef} onMouseDown={handleMouseDown}>
        <SlideColor slideColorWidth={sliderValue} />
        <SliderThumb
          id="thumb"
          SliderThumbLeft={sliderValue}
          onMouseDown={handleMouseDrag}
          TrackElement={TrackRef.current as HTMLDivElement}
        />
      </SliderTrack>
      {props?.duration ? <EndTime>{props?.duration}</EndTime> : <></>}
    </SliderContainer>
  )
}

export default Slider

interface SliderContainerProps {
  co: SliderProps
}
const SliderContainer = styled.div<SliderContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.co.sWidth};
  position: relative;
  padding: ${props => props.co.sPadding};
  gap: 8px;

  &:hover {
    span[id="thumb"] {
      background-color: ${props => props.theme.secondary_color};
    }
  }
`

const SliderTrack = styled.div`
  width: inherit;
  height: 4px;
  border-radius: 10px;
  background-color: #e1e1e1;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`

interface SliderThumbProps {
  SliderThumbLeft: number
  TrackElement: HTMLDivElement
}

const SliderThumb = styled.span.attrs<SliderThumbProps>(props => ({
  style: {
    left: `calc(${props.SliderThumbLeft}% - 6px)`
  }
}))<SliderThumbProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
`

interface SlideColorProps {
  slideColorWidth: number
}
const SlideColor = styled.span.attrs<SlideColorProps>(props => ({
  style: {
    width: `${props.slideColorWidth}%`
  }
}))<SlideColorProps>`
  background-color: ${props => props.theme.secondary_color};
  position: absolute;
  height: 4px;
  border-radius: 10px;
`
const StartTime = styled.span`
  font-size: 10px;
`
const EndTime = styled(StartTime)``
