import React, {
  FC,
  ReactElement,
  useRef,
  memo,
  useState,
  MouseEventHandler,
  useEffect
} from "react"
import styled from "styled-components"
import Slider from "../Slider"
import { RiFullscreenFill } from "react-icons/ri"
import { FaPlay, FaPause } from "react-icons/fa"
import Volume from "../Volume"
import { Button } from "../../styles/Button.style"
import useCurrentTime from "../AudioPlayer/Player/Controller/Hooks/useCurrentTime"
import useDuration from "../AudioPlayer/Player/Controller/Hooks/useDuration"

interface IProps {
  src: string
  poster: string
}
const MvPlayer: FC<IProps> = ({ src, poster }): ReactElement => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const [currentTime, strCurrentTime, setCurrentTime, getisInterActiveValue] =
    useCurrentTime(videoRef.current!)
  const [duration, strDuration] = useDuration(videoRef.current!)

  /* 拖拽媒体进度条的时候 */
  const dragging = (value: number, isInterActive?: boolean) => {
    if (isInterActive) {
      setCurrentTime(Math.floor((value * duration) / 100))
    }
  }

  /* 播放 */
  const handlePlay = () => {
    videoRef.current
      ?.play()
      .then(() => setIsPlaying(!videoRef.current?.paused!))
  }
  /* 暂停 */
  const handlPause = () => {
    videoRef.current?.pause()
    setIsPlaying(!videoRef.current?.paused!)
  }

  /* 全屏 */
  const handleFullScreen: MouseEventHandler = e => {
    if (isFullScreen) {
      document.exitFullscreen().then(() => setIsFullScreen(!isFullScreen))
    } else {
      videoWrapRef.current
        ?.requestFullscreen()
        .then(() => setIsFullScreen(!isFullScreen))
    }
  }

  /* 播放结束后 */
  if (videoRef.current) {
    videoRef.current.onended = () => {
      handlPause()
    }
  }

  /* 阻止事件冒泡 */
  const handleStopPropagation: MouseEventHandler = e => {
    e.stopPropagation()
  }

  useEffect(() => {
    return () => {
      handlPause()
    }
  }, [src])

  return (
    <Video ref={videoWrapRef} onClick={isPlaying ? handlPause : handlePlay}>
      <video ref={videoRef} src={src} poster={poster}></video>
      {videoRef.current ? (
        <Controller className="controller" onClick={handleStopPropagation}>
          <ControllerWrap>
            <PlayerButton onClick={isPlaying ? handlPause : handlePlay}>
              {isPlaying ? (
                <FaPause className="FaPause" />
              ) : (
                <FaPlay className="FaPlay" />
              )}
            </PlayerButton>
            <SliderWrap>
              <Slider
                media={videoRef.current!}
                sWidth="100%"
                sPadding="0"
                duration={{ num: duration, str: strDuration }}
                currentTime={{ num: currentTime, str: strCurrentTime }}
                getSliderValue={dragging}
                getisInterActiveValue={getisInterActiveValue}
              />
            </SliderWrap>
            <VolumeWrap>
              <Volume media={videoRef.current} />
            </VolumeWrap>
            <FullScreen>
              <Button onClick={handleFullScreen}>
                <RiFullscreenFill className="RiFullscreenFill" />
              </Button>
            </FullScreen>
          </ControllerWrap>
        </Controller>
      ) : (
        <></>
      )}
    </Video>
  )
}
export default memo(MvPlayer)

const Video = styled.div`
  display: flex;
  width: 100%;
  height: 630px;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  /* background-color: #202124; */
  background-color: black;
  

  & video {
    width: inherit;
    height: inherit;
    /* object-fit: fill; */
  }

  &:hover {
    .controller {
      bottom: 0;
    }
  }
`
const Controller = styled.div`
  position: absolute;
  background: linear-gradient(transparent, rgba(0 0 0 / 46%));
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: -45px;
  gap: 10px;
  padding: 0 6px;
  transition: bottom 0.2s linear;
  color: white !important;
`
const ControllerWrap = styled.div`
  display: flex;
  width: 100%;
`
const PlayerButton = styled.div`
  flex: 0.25;
  display: flex;
  justify-content: center;
  align-items: center;

  .FaPlay,
  .FaPause {
    cursor: pointer;
    font-size: 24px;
    color: inherit;
  }
`
const SliderWrap = styled.div`
  display: flex;
  flex: 5;
  /* color: white; */
`
const VolumeWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 4px;

  .RiVolumeMute {
    color: white;
  }
`
const FullScreen = styled.div`
  flex: 0.25;
  display: flex;
  justify-content: center;
  align-items: center;

  .RiFullscreenFill {
    font-size: 22px;
    color: white !important;
  }
`
