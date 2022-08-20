import React, { FC, ReactElement, useEffect, useRef } from "react"
import styled from "styled-components"
import Media from "../../utils/Media"
import useCurrentTime from "./Hooks/useCurrentTime"
import useDrag from "./Hooks/useDrag"
import useDuration from "./Hooks/useDuration"

export interface SliderProps {
  type?: Media
  volume?: "volume"
  sWidth?: string
  sPadding?: string
  isMuted?: boolean
  getSliderValue?: (value: number) => void
}

const Slider: FC<SliderProps> = (props): ReactElement => {
  const TrackRef = useRef<HTMLDivElement>(null)
  const [strCurrentTime, currentTime] = useCurrentTime({
    mediaObject: props.type as Media
  })
  const [strDuration, duration] = useDuration({
    mediaObject: props.type as Media
  })
  const [sliderValue, setSliderValue, handleMouseDown, handleMouseDrag] =
    useDrag({
      trackElement: TrackRef.current as HTMLDivElement,
      mediaObject: props.type as Media,
      currentTime,
      duration
    })


  /* 修改音量 */
  useEffect(() => {
    if (props.getSliderValue) props.getSliderValue(sliderValue)
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
      {props.volume ? <></> : <StartTime>{strCurrentTime}</StartTime>}
      <SliderTrack id="track" ref={TrackRef} onMouseDown={handleMouseDown}>
        <SlideColor slideColorWidth={sliderValue} />
        <SliderThumb
          id="thumb"
          SliderThumbLeft={sliderValue}
          onMouseDown={handleMouseDrag}
          TrackElement={TrackRef.current as HTMLDivElement}
        />
      </SliderTrack>
      {props.volume ? <></> : <EndTime>{strDuration}</EndTime>}
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
  transition: all 1s linear;

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
