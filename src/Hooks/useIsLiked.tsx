import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState
} from "react"
import { SetterOrUpdater, useRecoilState } from "recoil"
import { UserLikedSongListsIds } from "../recoil"

const useIsLiked = (
  id?: number
): [boolean, (id: number) => boolean, SetterOrUpdater<number[]>] => {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  /* 用户喜欢的歌曲ids */
  const [likedIds, setLikedId] = useRecoilState(UserLikedSongListsIds)

  useEffect(() => {
    if (id) likedIds.includes(id) ? setIsLiked(true) : setIsLiked(false)
    if(!id) setIsLiked(false) 
  }, [id,likedIds])

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
