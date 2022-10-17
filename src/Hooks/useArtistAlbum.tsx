import React, { FC, ReactElement, useEffect, useState } from "react"
import { RouterPath } from "../types"
import {
  Albums,
  HotAlbum,
  useArtistAlbumType
} from "../pages/ArtistDetail/types"
import random from "../utils/random"
import { request } from "../utils/request"

/**
 * 获取歌手专辑
 * @param artistId 歌手ID
 * @returns type: 用于路由导航, list: 专辑数组
 */

const useArtistAlbum = (artistId: number): useArtistAlbumType => {
  const [album, setAlbum] = useState<Albums[]>([])

  useEffect(() => {
    if (!artistId) return
    request("artist/album", "GET", `&id=${artistId}`).then((res: HotAlbum) => {
      setAlbum(random(10, res.hotAlbums))
    })
  }, [artistId])

  return { type: RouterPath.ALBUM, list: album }
}

export default useArtistAlbum
