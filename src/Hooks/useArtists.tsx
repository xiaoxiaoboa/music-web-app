import React, { useEffect, useState } from "react"
import { request } from "../utils/request"
import random from "../utils/random"
import { RouterPath } from "../types"

import { ArtistType, ArtistsType, useArtistsType } from "../pages/Home/types"

const useArtists = (): useArtistsType => {
  const [list, setList] = useState<ArtistType[]>([])

  useEffect(() => {
    const getArtists = async (type: number[], amount: number) => {
      await request(
        "toplist/artist",
        "GET",
        `&type=${random(1, type)[0]}`
      ).then((res: ArtistsType) => {
        setList(prev => [...prev, ...random(amount, res.list.artists)])
      })
    }

    getArtists([1], 4).then(() => getArtists([2, 3, 4], 2))
  }, [])

  return { type: RouterPath.ARTIST, list }
}

export default useArtists
