import { useEffect, useState } from "react"
import { request } from "../../../utils/request"
import { SongListType, SongListsType } from "../../../types"
import { useRecoilState } from "recoil"
import { HomeSongListsState } from "../../../recoil"
import { useSongListsType } from "../../../types"

const useSongLists = (): useSongListsType => {
  const [list, setList] = useRecoilState(HomeSongListsState)

  useEffect(() => {
    if (list.length > 0) return
    request("personalized", "GET", "&limit=10").then((res: SongListsType) =>
      setList(() => res.result)
    )
  }, [])

  return { type: "songlistdetail", list }
}

export default useSongLists
