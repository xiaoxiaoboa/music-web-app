import React, { useEffect, useMemo, useRef, useState } from "react"

/* 获取媒体的currentTime */
export default function useCurrentTime(
  media: HTMLMediaElement
): [
  number,
  string,
  React.Dispatch<React.SetStateAction<number>>,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isInterActive, setIsInterActive] = useState<boolean>(false)

  useEffect(() => {
    if(media?.src === '') setCurrentTime(0)
  },[media])


  if (media) {
    media.ontimeupdate = () => {
      if (isInterActive === false) {
        setCurrentTime(Math.floor(media.currentTime))
      }
    }
  }

  const toMinute = useMemo(() => {
    return (
      ("" + (Math.floor(currentTime / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (currentTime % 60)).slice(-2)
    )
  }, [currentTime])

  return [currentTime, toMinute, setCurrentTime, setIsInterActive]
}
