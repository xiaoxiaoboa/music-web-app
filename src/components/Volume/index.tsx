import React, { FC, useCallback, useMemo, useState } from "react"
import Slider from "../Slider"
import { RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri"
// import { Button } from "../Player/index.style"
import { DefaultTheme, StyledComponent } from "styled-components"

interface IProps {
  mediaObject: HTMLMediaElement
  Button: StyledComponent<"button", DefaultTheme, {}, never>
}

const Volume: FC<IProps> = ({ mediaObject, Button }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false)
  /* 处理静音 */
  const handleMuted = () => {
    setIsMuted(() => !isMuted)
    mediaObject.muted = !isMuted
  }

  /* 修改音量 */
  const handleVolume = (value: number): void => {
    mediaObject.volume = value / 100

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
        type="volume"
        sWidth={`6.25rem`}
        sPadding={`.5rem 0`}
        getSliderValue={handleVolume}
        isMuted={isMuted}
      />
    </>
  )
}

export default Volume
