import React, { FC, useState, memo, useEffect, useCallback } from "react"
import Slider from "../Slider"
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri"
import Button from "../Button"
import "./index.css"

interface IProps {
  media: HTMLMediaElement
}


const Volume: FC<IProps> = ({ media }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true)


  /* 处理静音 */
  const handleMuted = () => {
    setIsMuted(() => !isMuted)
    media.muted = !isMuted
  }

  /* 修改音量 */
  const handleVolume = (value: number): void => {
    media.volume = value / 100
    savelocal(media.volume)

    if (value === 0 && isMuted === false) {
      handleMuted()
    } else if (value > 0 && isMuted === true) {
      handleMuted()
    }
  }

  /* 把volume和isMuted存储到本地 */
  const savelocal = (volume: number) => {
    const tempData = JSON.parse(localStorage.getItem("audiostate") as string)
    const newData = { volume }
    const result = { ...tempData, ...newData }
    localStorage.setItem("audiostate", JSON.stringify(result))
  }
  
  /* 把本地存储的volume值传给Slider组件，如果没有返回undefined */
  const getLocalVolume = useCallback((): number | undefined => {
    return localStorage.getItem("audiostate")
      ? JSON.parse(localStorage.getItem("audiostate") as string).volume * 100
      : undefined
  }, [])

  return (
    <>
      <Button onClick={handleMuted}>
        {isMuted ? (
          <RiVolumeMuteFill className="RiVolumeMute" />
        ) : (
          <RiVolumeUpFill className="RiVolumeMute" />
        )}
      </Button>
      <Slider
        styles={{ width: `6.25rem`, padding: `.5rem 0` }}
        getSliderValue={handleVolume}
        isMuted={isMuted}
        volume={getLocalVolume()}
      />
    </>
  )
}

export default memo(Volume)
