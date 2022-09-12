import React, { useEffect, useMemo, useRef, useState } from "react"
import Media from "../../../../utils/Media"
import { useRecoilState, useRecoilValue } from "recoil"
import { AudioState, isInterActiveState } from "../../../../recoil/atom"

interface IProps {
  // media: Media
  isInterActive: boolean
}

/* 获取媒体的currentTime，无设置功能 */
export default function useCurrentTime(): string {
  const [state, setState] = useRecoilState(AudioState)
  const isInterActive = useRecoilValue(isInterActiveState)

  state.audio.element.ontimeupdate = () => {
    if (!isInterActive) {
      setState(prev => ({
        ...prev,
        ...{ currentTime: Math.floor(state.audio.currentTime) }
      }))
    }
  }

  const toMinute = useMemo(() => {
    return (
      ("" + (Math.floor(state.currentTime / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (state.currentTime % 60)).slice(-2)
    )
  }, [state.currentTime])

  return toMinute
}
