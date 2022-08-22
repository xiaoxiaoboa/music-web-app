import React, { useEffect, useMemo, useRef, useState } from "react"
import Media from "../../../utils/Media"

interface IProps {
  mediaObject: Media
}

/* 获取媒体的currentTime，无设置功能 */
export default function useCurrentTime({
  mediaObject
}: IProps): [string, number] {
  const [currentTime, setCurrentTime] = useState<number>(0)

  // useEffect(() => {
  //   console.log(mediaObject?.paused)
  //   if(mediaObject?.paused) {
  //     setCurrentTime(() => mediaObject?.currentTime)
  //   }
  // },[mediaObject?.currentTime])

  /* 改变媒体播放轨道的值时，控制currentTime这个state，把改变后的state赋值给媒体元素的currentTime */

  useEffect(() => {
    let timer: number = -1
    if (!mediaObject?.paused) {
      timer = setInterval(() => {
        setCurrentTime(() => Math.floor(mediaObject?.currentTime))
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [mediaObject?.paused])

  const toMinute = useMemo(() => {
    return (
      ("" + (Math.floor(currentTime / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (currentTime % 60)).slice(-2)
    )
  }, [currentTime])

  return [toMinute, currentTime]
}
