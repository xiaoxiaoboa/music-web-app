import { MouseEventHandler, useEffect, useMemo, useState } from "react"

interface IProps {
  trackElement: HTMLDivElement
  setSliderValue: React.Dispatch<React.SetStateAction<number>>
}

export default function useDrag({
  trackElement,
  setSliderValue
}: IProps): [boolean, MouseEventHandler] {
  /* 鼠标距文档左侧X轴额距离 */
  const [mouseX, setMouseX] = useState<number>(0)
  /* Slider是否在交互中 */
  const [isInterActive, setIsInterActive] = useState<boolean>(false)

  const offSetLeft: number = useMemo(
    () =>
      (trackElement?.offsetParent as HTMLDivElement)?.offsetLeft +
      trackElement?.offsetLeft,
    [(trackElement?.offsetParent as HTMLDivElement)?.offsetLeft]
  )

  /* 鼠标位置改变时，计算成百分比后更新state */
  useEffect(() => {
    if (offSetLeft === undefined || mouseX === 0) return
    setSliderValue(() => percentCalculate(mouseX - offSetLeft, trackElement))
  }, [mouseX])

  const startDrag: MouseEventHandler = e => {
    /* 鼠标单击落下时 */
    const handleMouseDown = () => {
      e.preventDefault()
      setIsInterActive(true)
      setMouseX(() => e.clientX)
    }

    /* 拖拽鼠标时 */
    const handleMouseDrag = (e: globalThis.MouseEvent) => {
      e.preventDefault()
      document.onmousemove = e => {
        setMouseX(() => e.clientX)
      }
    }

    /* 松开鼠标时 */
    const handleMouseUp = () => {
      setIsInterActive(false)

      document.onmousedown = null
      document.onmousemove = null
      document.onmouseup = null
    }

    document.onmousedown = handleMouseDown
    document.onmousemove = handleMouseDrag
    document.onmouseup = handleMouseUp
  }

  /* 百分比计算 */
  const percentCalculate = useMemo(
    () =>
      (value: number, htmlElement: HTMLDivElement): number => {
        const rel = Math.round((value / htmlElement?.clientWidth) * 100)

        return rel > 100 ? 100 : rel < 0 ? 0 : rel
      },
    [mouseX]
  )

  return [isInterActive, startDrag]
}
