import React, { useCallback, useMemo, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { AudioState } from "../../../../../recoil/atom"


export default function useDuration(): [number,string] {
  const state = useRecoilValue(AudioState)
  const [duration, setDuration] = useState<number>(0)

  /* canplaythrough事件触发后，可以准确的获得到媒体的duration */
  state.audio.oncanplay = () => {
    setDuration(state.audio.duration)
  }

  /* 转换格式 */
  const format = useMemo((): string => {
    if (duration === 0) return "0:00"
    const minute = Math.floor(duration / 60)
    const second = Math.floor(duration - minute * 60)
    return minute + ":" + ("0" + second).slice(-2)
  }, [duration])

  return [duration,format]
}
