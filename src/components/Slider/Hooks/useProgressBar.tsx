import React, { useEffect, useState } from "react"
import Media from "../../../utils/Media"
import useDuration from "./useDuration"

interface IProps {
  mediaObject: Media
  sliderValue: number
  // setSlideValue: React.Dispatch<React.SetStateAction<number>>
}

export default function useProgressBar({
  mediaObject,
  sliderValue
}: IProps): boolean {
  const [strDuration, duration] = useDuration({ mediaObject })

  /* 把媒体总时间分为100份，计算出1%是多少秒 */
  useEffect(() => {
    if (mediaObject)
      mediaObject.currentTime = Math.floor(sliderValue * toFixed(duration))
  }, [sliderValue])

  /* 取小数点后两位，无四舍五入 */
  const toFixed = (number: number) => {
    return Math.floor(number) / 100
  }

  return false
}
