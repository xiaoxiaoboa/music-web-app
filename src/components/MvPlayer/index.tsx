import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import Slider from "../Slider"
import { RiFullscreenFill } from "react-icons/ri"

const MvPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const testRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.dir(testRef.current)
  }, [testRef.current])
  return (
    <Video ref={videoWrapRef}>
      {/* <video ref={videoRef} src={"/src/assets/mv.mp4"}></video> */}
      <Controller>
        <PlayerButton></PlayerButton>
        <SliderWrap ref={testRef}>
          <Slider sWidth="100%" sPadding="0" />
        </SliderWrap>
        <VolumeWrap>{/* <Slider sWidth="80%" sPadding="0" /> */}</VolumeWrap>
        <FullScreen>
          <div className="wraper">
            <RiFullscreenFill className="RiFullscreenFill" />
          </div>
        </FullScreen>
      </Controller>
    </Video>
  )
}
export default MvPlayer

const Video = styled.div`
  display: flex;
  width: 100%;
  height: 550px;
  justify-content: center;
  padding: 10px 0;
  /* position: relative; */

  & video {
    width: 90%;
    height: 100%;
    object-fit: fill;
    border-radius: 10px;
  }
`
const Controller = styled.div`
  /* position: absolute; */
  background-color: white;
  width: 90%;
  height: 30px;
  display: flex;
`
const PlayerButton = styled.div`
  display: flex;
  flex: 0.5;
`
const SliderWrap = styled.div`
  display: flex;
  flex: 5;
`
const VolumeWrap = styled.div`
  display: flex;
  flex: 1;
`
const FullScreen = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  .wraper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wraper .RiFullscreenFill {
    font-size: 22px;
  }
`
