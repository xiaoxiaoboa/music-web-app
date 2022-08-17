import React, { useEffect, useState } from "react"
import media from "../../../utils/Media"

interface IProps {
  mediaObject: media
  setSlideValue: React.Dispatch<React.SetStateAction<number>>
}

export default function useAnimationOfSlide({
  mediaObject,
  setSlideValue
}: IProps): boolean {
  const [duration, setDuration] = useState<number>(mediaObject.duration)

  useEffect(() => {
    console.log(typeof duration)
  }, [duration])

  return false
}
