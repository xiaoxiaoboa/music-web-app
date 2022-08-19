import { MouseEventHandler, useEffect, useRef, useState } from "react"
import Media from "../../../utils/Media"
import useDuration from "./useDuration"

interface IProps {
  trackElement: HTMLDivElement
  mediaObject?: Media
  currentTime?: number
}

export default function useDrag({
  trackElement,
  mediaObject,
  currentTime
}: IProps): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  MouseEventHandler,
  MouseEventHandler
] {
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [mouseX, setMouseX] = useState<number>(0)
  const [strDuration, duration] = useDuration({ mediaObject: mediaObject! })
  const offSetLeft =
    (trackElement?.offsetParent as HTMLDivElement)?.offsetLeft +
    trackElement?.offsetLeft

  useEffect(() => {
    if(!currentTime) return 
    const onePercent = Math.floor(duration) / 100
    setSliderValue(() => parseFloat((currentTime! / onePercent).toFixed(1)))
    console.log(parseFloat((currentTime! / onePercent).toFixed(1)))
  }, [currentTime])

  useEffect(() => {
    if (offSetLeft === undefined || mouseX === 0) return
    setSliderValue(() => percentCalculate(mouseX - offSetLeft, trackElement))
  }, [mouseX])

  useEffect(
    () => () => {
      document.onmouseup = null
      document.onmousemove = null
    },
    []
  )

  /* 鼠标单击落下时 */
  const handleMouseDown: MouseEventHandler = (e): void => {
    e.preventDefault()
    setMouseX(() => e.clientX)
    handleMouseDrag(e)
  }
  /* 拖拽鼠标时 */
  const handleMouseDrag: MouseEventHandler = (e): void => {
    e.preventDefault()
    document.onmousemove = e => {
      setMouseX(() => e.clientX)
    }
  }
  /* 结束鼠标拖拽时，清除监听 */
  document.onmouseup = () => {
    document.onmousemove = null
  }

  /* 百分比计算 */
  const percentCalculate = (
    progressValue: number,
    htmlElement: HTMLDivElement
  ): number => {
    const rel = Math.round((progressValue / htmlElement?.clientWidth) * 100)

    return rel > 100 ? 100 : rel < 0 ? 0 : rel
  }

  return [sliderValue, setSliderValue, handleMouseDown, handleMouseDrag]
}
