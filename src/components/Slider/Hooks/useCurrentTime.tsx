import React, { useEffect, useRef, useState } from "react"
import Media from "../../../utils/Media"

interface IProps {
  mediaObject: Media
}

/* 获取媒体的currentTime，无设置功能 */
export default function useCurrentTime({ mediaObject }: IProps): [string, number] {
  const [currentTime, setCurrentTime] = useState<number>(0)

  useEffect(() => {
    let timer: number = -1
    if (!mediaObject?.paused) {
      timer = setInterval(() => {
        setCurrentTime(() => Math.floor(mediaObject?.currentTime + 1))
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [mediaObject?.paused])

  const toMinute = () => {
    return (
      ("" + (Math.floor(currentTime / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (currentTime % 60)).slice(-2)
    )
  }


  return [toMinute(), currentTime]
}
