import React, { useMemo, useState, useEffect } from "react"
import timeFormat from '../utils/timeFormat'

export default function useDuration(media: HTMLMediaElement): [number, string] {
  const [duration, setDuration] = useState<number>(0)

  useEffect(() => {
    if(media?.src === '') setDuration(0)
  },[media])


  /* canplaythrough事件触发后，可以准确的获得到媒体的duration */
  if (media) {
    media.oncanplay = () => {
      setDuration(media.duration)
    }
  }


  return [duration, timeFormat(duration)]
}

