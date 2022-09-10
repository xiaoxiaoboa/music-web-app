import { useEffect, useRef, useState } from "react"
import { TrackIds, Track, SongDetailType } from "../../../types"
import { request } from "../../../utils/request"

export default function useScroll(
  songsId: number[],
  target: HTMLDivElement
): [Track[], boolean | string, () => void] {
  const [state, setState] = useState<Track[]>([])
  const [requesting, setRequesting] = useState<boolean | string >(false)
  const minRef = useRef<number>(0)
  const maxRef = useRef<number>(10)

  useEffect(() => {
    if (songsId.length > 0) {
      console.log("useEffect渲染了")
      requestSongs()
      // console.log(limitCount(songsId, 20))
    }
  }, [songsId.length])

  // target?.addEventListener("scroll", () => {
  //   const distanceBottom =
  //     target.scrollHeight - target.clientHeight - target.scrollTop
  //   if (distanceBottom < 300) {
  //     console.log(distanceBottom)
  //     // requestSongs()
  //   }
  // })

  const requestSongs = (): void => {
    setRequesting(true)
    if(minRef.current >= songsId.length) return setRequesting("没有更多了！")
    const ids: number[] = limitCount(songsId, minRef.current, maxRef.current)
    request("song/detail", "GET", `&ids=${ids.toString()}`).then(
      (res: SongDetailType) => {
        setState((prev: Track[]) => [...prev, ...res.songs])
        setRequesting(false)
      }
    )
  }

  const limitCount = (ids: number[], min: number, max: number): number[] => {
    minRef.current = max
    maxRef.current = maxRef.current + 10
    return ids.filter(id => ids.indexOf(id) >= min && ids.indexOf(id) < max)
  }

  return [state, requesting, requestSongs]
}
