import React, {
  FC,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState
} from "react"
import styled from "styled-components"
import useDrag from "./Hooks/useDrag"

const Slider: FC = (): ReactElement => {
  const SlideColorRef = useRef<HTMLSpanElement>(null)
  const ThumbRef = useRef<HTMLSpanElement>(null)
  const TrackRef = useRef<HTMLDivElement>(null)
  const [mouseOffsetX, handleMouseDown, handleMouseDrag, percentCalculate] =
    useDrag({
      trackElement: TrackRef.current as HTMLDivElement
    })

  return (
    <SliderContainer onMouseDown={handleMouseDown}>
      <SliderTrack id="track" ref={TrackRef}>
        <SlideColor
          ref={SlideColorRef}
          slideColorWidth={percentCalculate(
            mouseOffsetX,
            TrackRef.current!,
            "slideColor"
          )}
        />
        <SliderThumb
          id="thumb"
          ref={ThumbRef}
          SliderThumbLeft={percentCalculate(
            mouseOffsetX,
            TrackRef.current!,
            "thumb"
          )}
          onMouseDown={handleMouseDrag}
          TrackElement={TrackRef.current as HTMLDivElement}
        />
      </SliderTrack>
    </SliderContainer>
  )
}

export default Slider

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 8px 0;
  cursor: pointer;

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
    left: `calc(${props.SliderThumbLeft}% - 8px)`
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
