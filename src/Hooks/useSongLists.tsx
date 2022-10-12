import { useEffect, useState } from "react"
import { request } from "../utils/request"
import { SongListType, SongListsType } from "../types"
import { useSongListsType } from "../types"
import random from "../utils/random"

/**
 * 获取歌单
 * @param amount 需要的数量 
 * @returns type: 用户路由导航, list：歌单数组 
 */

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
