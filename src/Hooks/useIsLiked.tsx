import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState
} from "react"
import { SetterOrUpdater, useRecoilState } from "recoil"
import { UserLikedIds } from "../recoil/atom"

const useIsLiked = (
  id?: number
): [boolean, (id: number) => boolean, SetterOrUpdater<number[]>] => {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likedIds, setLikedId] = useRecoilState(UserLikedIds)

  useEffect(() => {
    if (id) likedIds.includes(id) ? setIsLiked(true) : setIsLiked(false)
  }, [id])

  /* 给SongList列表使用 */
  const isLikedFn = useCallback(
    (id: number): boolean => {
      return likedIds.includes(id)
    },
    [likedIds]
  )

  return [isLiked, isLikedFn, setLikedId]
}

export default useIsLiked
