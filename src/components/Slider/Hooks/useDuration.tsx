import React, { useCallback, useMemo, useState } from "react"
import Media from "../../../utils/Media"

interface IProps {
  mediaObject: Media
}

export default function useDuration({ mediaObject }: IProps): [string, number] {
  const [duration, setDuration] = useState<number>(0)

  /* canplaythrough事件触发后，可以准确的获得到媒体的duration */
  mediaObject?.value.addEventListener("canplay", () => {
    setDuration(() => mediaObject?.duration)
  })

  /* 转换格式 */
  const format = useMemo((): string => {
    if (duration === 0) return "0:00"
    const minute = Math.floor(duration / 60)
    const second = Math.floor(duration - minute * 60)
    return minute + ":" + second
  }, [duration])

  return [format, duration]
}
