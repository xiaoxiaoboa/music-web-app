import React, { useEffect, useState } from "react"
import { addMessage } from "../../components/Snackbar"
import { RouterPath } from "../../types"
import { request } from "../../utils/request"
import { SongListsType, PlayListsType } from "./types"

/**
 * 请求歌单
 * @param page 用于加载更多 
 * @param category 歌单类别
 * @param amount 返回的歌单数量
 * @returns type: 用于路由, list: 歌单数据
 */

const useSongLists = (
  page: number,
  category: string,
  amount: number
): { type: string; list: PlayListsType[] } => {
  const [playLists, setPlayLists] = useState<PlayListsType[]>([])
  const [total, setTotal] = useState<number>(-1)

  useEffect(() => setPlayLists([]), [category])

  useEffect(() => {
    if (playLists.length === total) return addMessage("已经到底啦！")
    request(
      "top/playlist",
      "GET",
      `&cat=${category}&limit=${amount}&offset=${playLists.length}`
    ).then((res: SongListsType) => {
      setPlayLists(prev => [...prev, ...res.playlists])
      if (total !== res.total) setTotal(res.total)
    })
  }, [page, category])

  return { type: RouterPath.SONGLIST, list: playLists }
}

export default useSongLists
