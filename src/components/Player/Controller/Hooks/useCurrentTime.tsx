import React, { useEffect, useMemo, useRef, useState } from "react"
import Media from "../../../../utils/Media"
import { useRecoilState, useRecoilValue } from "recoil"
import { AudioState, isInterActiveState } from "../../../../recoil/atom"

interface IProps {
  // media: Media
  isInterActive: boolean
}

/* 获取媒体的currentTime */
export default function useCurrentTime(): [
  string,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [state, setState] = useRecoilState(AudioState)
  const [isInterActive, setIsInterActive] = useState<boolean>(false)

  state.audio.element.ontimeupdate = () => {
    if (isInterActive === false) {
      setState(prev => ({
        ...prev,
        ...{ currentTime: Math.floor(state.audio.currentTime) }
      }))
    }
  }

  // const getisInterActiveValue = (value: boolean):void => {
  //   // console.log(value)
  //   setIsInterActive(value)
  // }

  const toMinute = useMemo(() => {
    return (
      ("" + (Math.floor(state.currentTime / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (state.currentTime % 60)).slice(-2)
    )
  }, [state.currentTime])

  return [toMinute, setIsInterActive]
}
