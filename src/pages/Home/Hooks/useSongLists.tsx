import { useEffect, useState } from "react"
import { recommendedList } from "../../../utils/request"
import { SongListType, SongListsType } from "../../../types"
import { useRecoilState } from "recoil"
import { HomeSongListsState } from "../../../recoil"

const useSongLists = (): SongListType[] => {
  const [songLists, setSongList] = useRecoilState(HomeSongListsState)

  useEffect(() => {
    if(songLists.length > 0) return
    recommendedList("personalized", 10).then((res: SongListsType) =>
      setSongList(() => res.result)
    )
  }, [])
  return songLists
}

export default useSongLists
