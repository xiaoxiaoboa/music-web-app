import React, { useEffect, useMemo, useRef, useState } from "react"
import Media from "../../../utils/Media"
import { useRecoilValue } from "recoil"
import { PlayListState } from "../../../recoil/atom"

interface IProps {
  media: Media
  isInterActive: boolean
}

/* 获取媒体的currentTime，无设置功能 */
export default function useCurrentTime({
  media,
  isInterActive
}: IProps): [string, number, React.Dispatch<React.SetStateAction<number>>] {
  const [currentTime, setCurrentTime] = useState<number>(0)



  /* 播放媒体时如果未拖拽滑块，则通过定时器改变进度条左侧的currentTime */
  useEffect(() => {
    let timer: number = -1
    if (media?.paused === false && isInterActive === false) {
      timer = setInterval(() => {
        setCurrentTime(() => Math.floor(media?.currentTime))
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [media?.paused, isInterActive])

  const toMinute = useMemo(() => {
    return (
      ("" + (Math.floor(currentTime / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (currentTime % 60)).slice(-2)
    )
  }, [currentTime])

  return [toMinute, currentTime, setCurrentTime]
}
