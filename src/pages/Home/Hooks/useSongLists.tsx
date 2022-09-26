import { useEffect, useState } from "react"
import { request } from "../../../utils/request"
import { SongListType, SongListsType } from "../../../types"
import { useSongListsType } from "../../../types"

const useSongLists = (amount: number): useSongListsType => {
  // const [list, setList] = useRecoilState(HomeSongListsState)
  const [list, setList] = useState<SongListType[]>([])

  useEffect(() => {
    if (list.length > 0) return
    request("personalized", "GET", `&limit=${amount}`).then(
      (res: SongListsType) => setList(() => res.result)
    )
  }, [])

  return { type: "/songlistdetail", list }
}

export default useSongLists
