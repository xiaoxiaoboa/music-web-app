import React, { FC, ReactElement, useEffect, useState } from "react"
import { Albums, HotAlbum, useArtistAlbumType } from "../types"
import random from "../utils/random"
import { request } from "../utils/request"

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
