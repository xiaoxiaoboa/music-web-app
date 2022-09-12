import React, { useCallback, useMemo, useState } from "react"
import Media from "../../../utils/Media"

interface IProps {
  media: Media
}

export default function useDuration({
  media
}: IProps): [string, number, number] {
  const [duration, setDuration] = useState<number>(0)
  const toFixed = useMemo(() => Math.floor(duration!) / 100, [duration!])


  /* canplaythrough事件触发后，可以准确的获得到媒体的duration */
  media?.element.addEventListener("canplay", () => {
    
    setDuration(() => media?.duration)
  })

  /* 转换格式 */
  const format = useMemo((): string => {
    if (duration === 0) return "0:00"
    const minute = Math.floor(duration / 60)
    const second = Math.floor(duration - minute * 60)
    return minute + ":" +  ('0'+second).slice(-2)
  }, [duration])

  return [format, duration, toFixed]
}
