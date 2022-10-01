import { useEffect, useState } from "react"
import { request } from "../../../utils/request"
import { SongListType, SongListsType } from "../../../types"
import { useSongListsType } from "../../../types"
import random from "../../../utils/random"

const useSongLists = (amount: number): useSongListsType => {
  const [list, setList] = useState<SongListType[]>([])

  useEffect(() => {
    request("personalized", "GET", `&limit=${amount + 40}`).then(
      (res: SongListsType) => {
        setList(() => random(amount, res.result))
      }
    )
  }, [])

  return { type: "/songlistdetail", list }
}

export default useSongLists
