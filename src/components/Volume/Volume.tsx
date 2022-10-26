import React, { FC, useState, memo, useEffect, useCallback } from "react"
import Slider from "../Slider"
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri"
import Button from "../Button"

interface IProps {
  media: HTMLMediaElement
  volume?: number
}


const Volume: FC<IProps> = ({ media,volume }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true)


  /* 处理静音 */
  const handleMuted = () => {
    setIsMuted(() => !isMuted)
    media.muted = !isMuted
  }

  /* 修改音量 */
  const handleVolume = (value: number): void => {
    media.volume = value / 100

    if (value === 0 && isMuted === false) {
      handleMuted()
    } else if (value > 0 && isMuted === true) {
      handleMuted()
    }
  }


  return (
    <>
      <Button onClick={handleMuted} title={isMuted ? "取消静音" : "静音"}>
        {isMuted ? (
          <RiVolumeMuteFill className="RiVolumeMute" size={`1.25rem`} />
        ) : (
          <RiVolumeUpFill className="RiVolumeMute" size={`1.25rem`} />
        )}
      </Button>
      <Slider
        styles={{ width: `6.25rem`, padding: `.5rem 0` }}
        getSliderValue={handleVolume}
        isMuted={isMuted}
        volume={volume}
      />
    </>
  )
}

export default memo(Volume)
