import React, { MouseEventHandler, useEffect, useRef } from "react"
import styled from "styled-components"
import Slider from "../Slider"
import { RiFullscreenFill } from "react-icons/ri"
import { FaPlay, FaPause } from "react-icons/fa"
import Volume from "../Volume"
import { Button } from "../../styles/Button.style"

const MvPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)



  return (
    <Video ref={videoWrapRef}>
      <video ref={videoRef} src={"/src/assets/mv.mp4"}></video>
      <Controller>
        <PlayerButton>
          <FaPlay className="FaPlay" />
        </PlayerButton>
        <SliderWrap>
          <Slider
            sWidth="100%"
            sPadding="0"
            duration={{ num: 0, str: "00:00" }}
            currentTime={{ num: 0, str: "00:00" }}
          />
        </SliderWrap>
        <VolumeWrap>
          <Volume mediaObject={new Audio()} Button={Button} />
        </VolumeWrap>
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
  height: 600px;
  justify-content: center;
  padding: 10px 0;
  position: relative;

  & video {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 10px;
  }
`
const Controller = styled.div`
  position: absolute;
  background-color: rgb(16 22 26 / 0%);
  width: 100%;
  height: 35px;
  display: flex;
  bottom: 12px;
  gap: 10px;
  padding: 0 4px;
  border-radius:10px;
`
const PlayerButton = styled.div`
  flex: 0.25;
  display: flex;
  justify-content: center;
  align-items: center;


  .FaPlay{
    color: ${props => props.theme.secondary_color}
  }
`
const SliderWrap = styled.div`
  display: flex;
  flex: 5;
  color:white;
`
const VolumeWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content:center;
  gap:4px;

  .RiVolumeMute{
    color: white;
  }
`
const FullScreen = styled.div`
  flex: 0.25;
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
    color: white;
  }
`

