import { useEffect, useState } from "react"
import { recommendedList } from "../../../utils/request"
import { SongListType, SongListsType } from "../../../types"

const useSongLists = (): SongListType[] => {
  const [songLists, setSongList] = useState<SongListType[]>([])

  useEffect(() => {
    recommendedList("personalized", 10).then((res: SongListsType) =>
      setSongList(() => res.result)
    )
  }, [])
  return songLists
}

export default useSongLists
