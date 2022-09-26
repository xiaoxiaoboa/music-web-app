import React, { useEffect, useState } from "react"
import { request } from "../../../utils/request"
import random from "../../../utils/random"
import { ArtistsType, ArtistType } from "../../../types"
import { useArtistsType } from "../../../types"

const useArtists = (): useArtistsType => {
  const [list, setList] = useState<ArtistType[]>([])

  useEffect(() => {
    if (list.length > 0) return
    const getArtists = async (type: number[], amount: number) => {
      await request(
        "toplist/artist",
        "GET",
        `&type=${random(1, type)[0]}`
      ).then((res: ArtistsType) => {
        if (res.list.artists.length <= amount) {
          setList(prev => [...prev, ...res.list.artists])
        } else {
          setList(prev => [...prev, ...random(amount, res.list.artists)])
        }
      })
    }

    getArtists([1], 4).then(() => getArtists([2, 3, 4], 2))
  }, [])

  return { type: "/artistdetail", list }
}

export default useArtists
