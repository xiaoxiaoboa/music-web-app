import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"
import { FaBullseye } from "react-icons/fa"
import { SetterOrUpdater } from "recoil"
import Media from "../../../utils/Media"

interface IProps {
  trackElement: HTMLDivElement
  // media: Media
  // isInterActive: boolean
  // setIsInterActive: React.Dispatch<React.SetStateAction<boolean>>
  setSliderValue: React.Dispatch<React.SetStateAction<number>>
}

export default function useDrag({
  trackElement,
  // media,
  // isInterActive,
  // setIsInterActive,
  setSliderValue
}: IProps): [boolean, MouseEventHandler, MouseEventHandler] {
  /* 鼠标距文档左侧X轴额距离 */
  const [mouseX, setMouseX] = useState<number>(0)

  const [isInterActive, setIsInterActive] = useState<boolean>(false)

  /* 存储点击Slider时的元素节点，用于在松开鼠标按键时判断鼠标事件是否起始于Slider */
  const tempClickedElement = useRef<Element | null>(null)

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

  useEffect(
    () => () => {
      document.removeEventListener("mouseup", handleMouseUp)
    },
    []
  )

  /* 鼠标单击落下时 */
  const handleMouseDown: MouseEventHandler = useCallback((e): void => {
    e.preventDefault()
    tempClickedElement.current = e.currentTarget
    setIsInterActive(true)
    setMouseX(() => e.clientX)
    handleMouseDrag(e)
  }, [])

  /* 拖拽鼠标时 */
  const handleMouseDrag: MouseEventHandler = useCallback((e): void => {
    e.preventDefault()
    document.onmousemove = e => {
      setMouseX(() => e.clientX)
    }
  }, [])

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault()
    document.onmousemove = null
    document.removeEventListener('mouseup', handleMouseUp)
    console.log("@")
    // setIsInterActive(prev => !prev)
  }
  document.addEventListener("mouseup", handleMouseUp)

  /* 百分比计算 */
  const percentCalculate = (
    progressValue: number,
    htmlElement: HTMLDivElement
  ): number => {
    const rel = Math.round((progressValue / htmlElement?.clientWidth) * 100)

    return rel > 100 ? 100 : rel < 0 ? 0 : rel
  }


  return [isInterActive, handleMouseDown, handleMouseDrag]
}
