import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import useDrag from "./Hooks/useDrag"

interface SliderProps {
  media?: HTMLAudioElement | HTMLVideoElement
  sWidth: string
  sPadding: string
  isMuted?: boolean
  getSliderValue?: (value: number, isInterActive?: boolean) => void
  currentTime?: { num: number; str: string }
  duration?: { num: number; str: string }
  getisInterActiveValue?: React.Dispatch<React.SetStateAction<boolean>>
}

const Slider: FC<SliderProps> = (props): ReactElement => {
  /* Slider的值 */

  const [sliderValue, setSliderValue] = useState<number>(0)
  const TrackRef = useRef<HTMLDivElement>(null)

  const [isInterActive, handleDrag] = useDrag({
    trackElement: TrackRef.current as HTMLDivElement,
    setSliderValue
  })

  useEffect(() => {
    if (isInterActive === false && props.media) {
      const temp =
        props.currentTime?.num! / (Math.floor(props?.duration?.num!) / 100)

      setSliderValue(() => parseFloat(temp.toFixed(1)))
    }
  }, [props.currentTime?.num!])

  /* isInterActive变化时 */
  useEffect(() => {
    /* 如果是Media类型的Slider，就可以获取isInterActive的值 */
    if (props.media) {
      props.getisInterActiveValue!(isInterActive)
    }
    /* isInterActive为false并且类型时Media时， */
    if (isInterActive === false && props.media) {
      const currentTime = Math.floor(
        (sliderValue * props?.duration?.num!) / 100
      )
      props.media.currentTime = currentTime
    }
  }, [isInterActive])

  /* 父组件获取SliderValue */
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
      {props?.currentTime ? (
        <StartTime>{props?.currentTime.str!}</StartTime>
      ) : (
        <></>
      )}
      <TrackWrapper onMouseDown={handleDrag}>
        <SliderTrack id="track" ref={TrackRef}></SliderTrack>
        <SlideColor slideColorWidth={sliderValue} />
        <SliderThumb
          id="thumb"
          SliderThumbLeft={sliderValue}
          TrackElement={TrackRef.current as HTMLDivElement}
        />
      </TrackWrapper>
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
  padding: ${props => props.co.sPadding};
  gap: 8px;

  &:hover {
    span[id="thumb"] {
      background-color: ${props => props.theme.secondary_color};
    }
  }
`

const TrackWrapper = styled.span`
  position: relative;
  width: 100%;
  padding: 8px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const SliderTrack = styled.div`
  position: absolute;
  width: inherit;
  height: 4px;
  border-radius: 10px;
  background-color: #e1e1e1;
  display: flex;
  align-items: center;
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
  top: 2px;
  transition: background-color 0.2s linear;
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
  /* transition: all 0.2s linear; */
`
const StartTime = styled.span`
  font-size: 12px;
  color:inherit;
`
const EndTime = styled(StartTime)``
