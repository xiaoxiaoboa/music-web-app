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
  number,
  string,
  React.Dispatch<React.SetStateAction<number>>,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  // const [state, setState] = useRecoilState(AudioState)
  const state = useRecoilValue(AudioState)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isInterActive, setIsInterActive] = useState<boolean>(false)

  state.audio.ontimeupdate = () => {
    if (isInterActive === false) {
      // setState(prev => ({
      //   ...prev,
      //   ...{ currentTime: Math.floor(state.audio.currentTime) }
      // }))
      setCurrentTime(Math.floor(state.audio.currentTime))
    }
  }

  // const getisInterActiveValue = (value: boolean):void => {
  //   // console.log(value)
  //   setIsInterActive(value)
  // }

  const toMinute = useMemo(() => {
    return (
      ("" + (Math.floor(currentTime / 60) % 60)).slice(-2) +
      ":" +
      ("0" + (currentTime % 60)).slice(-2)
    )
  }, [currentTime])

  return [currentTime, toMinute, setCurrentTime,setIsInterActive]
}
