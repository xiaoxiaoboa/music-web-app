import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import Media from "../../../utils/Media"

interface IProps {
  trackElement: HTMLDivElement
  mediaObject: Media
  currentTime: number
  duration: number
}

export default function useDrag({
  trackElement,
  mediaObject,
  currentTime,
  duration
}: IProps): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  MouseEventHandler,
  MouseEventHandler,
] {
  /* Slider的值 */
  const [sliderValue, setSliderValue] = useState<number>(0)
  /* 鼠标距文档左侧X轴额距离 */
  const [mouseX, setMouseX] = useState<number>(0)
  /* 代表Slider的值是否根据currentTime的值变化而变化 */
  const [isMove, setIsMove] = useState<boolean>(true)
  /* 存储点击Slider时的元素节点，用于在松开鼠标按键时判断鼠标事件是否起始于Slider */
  const tempClickedElement = useRef<Element | null>(null)

  const offSetLeft: number = useMemo(
    () =>
      (trackElement?.offsetParent as HTMLDivElement)?.offsetLeft +
      trackElement?.offsetLeft,
    [trackElement]
  )

  /* 媒体的currentTime变化时，就改变Slider的值，进度条就会根据媒体的播放移动 */
  useEffect(() => {
    if (!currentTime || !isMove) return
    const onePercent: number = Math.floor(duration!) / 100
    setSliderValue(() => parseFloat((currentTime! / onePercent).toFixed(1)))
  }, [currentTime])

  /* 鼠标位置改变时，计算成百分比后更新state */
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
  const handleMouseDown: MouseEventHandler = useCallback((e): void => {
    e.preventDefault()
    tempClickedElement.current = e.currentTarget
    setIsMove(false)
    setMouseX(() => e.clientX)
    handleMouseDrag(e)
  }, [])

  /* 拖拽鼠标时 */
  const handleMouseDrag: MouseEventHandler = useCallback((e): void => {
    e.preventDefault()
    document.onmousemove = e => {
      setIsMove(false)
      setMouseX(() => e.clientX)
    }
  }, [])


  /* 结束鼠标按键时，清除监听 */
  document.onmouseup = () => {
    document.onmousemove = null
    if (tempClickedElement.current?.isEqualNode(trackElement)) {
      setIsMove(true)
      fastForward()
      tempClickedElement.current = null
    }
  }

  /* 百分比计算 */
  const percentCalculate = (
    progressValue: number,
    htmlElement: HTMLDivElement
  ): number => {
    const rel = Math.round((progressValue / htmlElement?.clientWidth) * 100)

    return rel > 100 ? 100 : rel < 0 ? 0 : rel
  }

  /* 点击Slider轨道实现快进 */
  const fastForward = () => {
    const toFixed = Math.floor(duration!) / 100

    if (mediaObject) mediaObject.currentTime = Math.floor(sliderValue * toFixed)
  }

  return [
    sliderValue,
    setSliderValue,
    handleMouseDown,
    handleMouseDrag,
  ]
}
