import { useEffect, useState } from "react"
import { recommendedList } from "../../../utils/request"
import { ListTpye } from "../../../types"

const useSongLists = (): ListTpye[] => {
  const [songLists, setSongList] = useState<ListTpye[]>([])

  useEffect(() => {
    recommendedList("personalized", 5).then(res =>
      setSongList(() => res.result)
    )
  }, [])
  return songLists
}

export default useSongLists
