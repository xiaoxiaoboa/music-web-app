import { useEffect, useState } from "react"
import { recommendedList } from "../../../utils/request"
import { SongListType, SongListsType } from "../../../types"
import { useRecoilState } from "recoil"
import { HomeSongListsState } from "../../../recoil"
import { useSongListsType } from "../../../types"


const useSongLists = (): useSongListsType => {
  const [list, setList] = useRecoilState(HomeSongListsState)

  useEffect(() => {
    if (list.length > 0) return
    recommendedList("personalized", 10).then((res: SongListsType) =>
      setList(() => res.result)
    )
  }, [])

  return { type: "songlistdetail", list }
}

export default useSongLists
