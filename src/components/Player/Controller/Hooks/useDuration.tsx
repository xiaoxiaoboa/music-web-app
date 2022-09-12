import React, { useCallback, useMemo, useState } from "react"
import Media from "../../../../utils/Media"
import { useRecoilState } from "recoil"
import { AudioState } from "../../../../recoil/atom"

interface IProps {
  media: Media
}

export default function useDuration(): string {
  const [state, setState] = useRecoilState(AudioState)
  // const toFixed = useMemo(
  //   () => Math.floor(state.duration!) / 100,
  //   [state.duration!]
  // )

  /* canplaythrough事件触发后，可以准确的获得到媒体的duration */
  state.audio.element.oncanplay = () => {
    setState((prev) => ({...prev, ...{duration: state.audio.duration}}))
  }

  /* 转换格式 */
  const format = useMemo((): string => {
    if (state.duration === 0) return "0:00"
    const minute = Math.floor(state.duration / 60)
    const second = Math.floor(state.duration - minute * 60)
    return minute + ":" + ("0" + second).slice(-2)
  }, [state.duration])

  return format
}
