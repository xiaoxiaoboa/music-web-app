import React, { FC, ReactElement, useRef } from "react"
import styled from "styled-components"
import useDrag from "./Hooks/useDrag"
import { AudioElementState } from "../../recoil"
import { useRecoilValue } from "recoil"
import { SliderProps } from "../../types"

const Slider: FC<SliderProps> = (props): ReactElement => {
  const SlideColorRef = useRef<HTMLSpanElement>(null)
  const ThumbRef = useRef<HTMLSpanElement>(null)
  const TrackRef = useRef<HTMLDivElement>(null)
  const AudioElement = useRecoilValue(AudioElementState)
  const [mouseOffsetX, handleMouseDown, handleMouseDrag] = useDrag({
    trackElement: TrackRef.current as HTMLDivElement
  })

  return (
    <SliderContainer onMouseDown={handleMouseDown} co={props}>
      <StartTime>0:00</StartTime>
      <SliderTrack id="track" ref={TrackRef}>
        <SlideColor ref={SlideColorRef} slideColorWidth={mouseOffsetX} />
        <SliderThumb
          id="thumb"
          ref={ThumbRef}
          SliderThumbLeft={mouseOffsetX}
          onMouseDown={handleMouseDrag}
          TrackElement={TrackRef.current as HTMLDivElement}
        />
      </SliderTrack>
      <EndTime>1:15</EndTime>
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
  gap: 11px;
  cursor: pointer;
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
`

interface SliderThumbProps {
  SliderThumbLeft: number
  TrackElement: HTMLDivElement
}

const SliderThumb = styled.span.attrs<SliderThumbProps>(props => ({
  style: {
    left: `calc(${props.SliderThumbLeft}% - 7px)`
  }
}))<SliderThumbProps>`
  width: 14px;
  height: 14px;
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
