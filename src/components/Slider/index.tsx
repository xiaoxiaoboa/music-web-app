import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import useDrag from "./Hooks/useDrag"
import { useRecoilValue } from "recoil"
import { AudioState } from "../../recoil/atom"

interface SliderProps {
  type?: string
  sWidth?: string
  sPadding?: string
  isMuted?: boolean
  getSliderValue?: (value: number, isInterActive?: boolean) => void
  currentTime?: {num: number, str: string}
  duration?: {num: number, str:string}
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

  const [isInterActive, handleDrag] = useDrag({
    trackElement: TrackRef.current as HTMLDivElement,
    setSliderValue
  })

  useEffect(() => {
    if (isInterActive === false && props.type === Type.MEDIA) {
      const temp = props.currentTime?.num! / (Math.floor(props?.duration?.num!) / 100)

      setSliderValue(() => parseFloat(temp.toFixed(1)))
    }
  }, [props.currentTime?.num!])

  useEffect(() => {
    if (props.type === Type.MEDIA) {
      props.getisInterActiveValue!(isInterActive)
    }
    if (isInterActive === false && props.type === Type.MEDIA) {
      const currentTime = Math.floor(
        (sliderValue * props?.duration?.num!) / 100
      )
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
      {props?.currentTime ? <StartTime>{props?.currentTime.str!}</StartTime> : <></>}
      <SliderTrack id="track" ref={TrackRef} onMouseDown={handleDrag}>
        <SlideColor slideColorWidth={sliderValue} />
        <SliderThumb
          id="thumb"
          SliderThumbLeft={sliderValue}
          // onMouseDown={handleMouseDrag}
          TrackElement={TrackRef.current as HTMLDivElement}
        />
      </SliderTrack>
      {props?.duration ? <EndTime>{props?.duration.str!}</EndTime> : <></>}
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
  font-size: 12px;
`
const EndTime = styled(StartTime)``
