import React, { FC, ReactElement, useEffect, useState } from "react"
import { Albums, HotAlbum, useArtistAlbumType } from "../types"
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
    request("artist/album", "GET", `&id=${artistId}`).then(
      (res: HotAlbum) => setAlbum(random(10, res.hotAlbums))
    )
  }, [])

  return { type: "albumdetail", list: album }
}

export default useArtistAlbum
