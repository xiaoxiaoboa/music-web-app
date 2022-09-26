import React, { FC, useCallback, useMemo, useState } from "react"
import Slider from "../Slider"
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri"
import { Button } from "../../styles/Button.style"
import { DefaultTheme, StyledComponent } from "styled-components"

interface IProps {
  media: HTMLMediaElement
}

const Volume: FC<IProps> = ({ media }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false)
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
      <Button onClick={handleMuted}>
        {isMuted ? (
          <RiVolumeMuteFill className="RiVolumeMute" />
        ) : (
          <RiVolumeUpFill className="RiVolumeMute" />
        )}
      </Button>
      <Slider
        sWidth={`6.25rem`}
        sPadding={`.5rem 0`}
        getSliderValue={handleVolume}
        isMuted={isMuted}
      />
    </>
  )
}

export default Volume
