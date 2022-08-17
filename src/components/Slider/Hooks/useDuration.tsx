import React, { FC, useEffect, useState } from "react"
import Media from "../../../utils/Media"

interface IProps {
  mediaObject: Media
}

export default function useDuration({ mediaObject }: IProps): string {
  const [duration, setDuration] = useState<number>(0)
  // mediaObject.value.oncanplaythrough = () => {
  //   const duration: number =
  //     mediaObject.duration === 0
  //       ? mediaObject.duration
  //       : mediaObject.duration + 1
  //   setDuration(() => duration)
  // }

  useEffect(() => {
    console.log('@')
    mediaObject?.value?.addEventListener("canplaythrough", () => {
      const duration: number =
        mediaObject?.duration === 0
          ? mediaObject?.duration
          : mediaObject?.duration + 1
      setDuration(() => duration)
    })
  }, [mediaObject])

  /* 转换格式 */
  const format = (): string => {
    if (duration === 0) return "00:00"
    const minute = Math.floor(duration / 60)
    const second = Math.floor(duration - minute * 60)
    return minute + ":" + second
  }

  return format()
}
