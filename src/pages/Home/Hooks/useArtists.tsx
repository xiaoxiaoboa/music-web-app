import React, { useEffect, useState } from "react"
import { recommendedArtist } from "../../../utils/request"
import random from "../../../utils/random"
import { ArtistsType, ArtistType } from "../../../types"

const useArtists = (): ArtistType[] => {
  const [artists, setArtists] = useState<ArtistType[]>([])

  useEffect(() => {
    const getArtists = async (min: number, max: number, amount: number) => {
      await recommendedArtist(
        "toplist/artist",
        random(min, max) as number
      ).then((res: ArtistsType) => {
        const randomNumber: number[] = random(
          0,
          res.list.artists.length - 1,
          amount
        ) as number[]
        const newArr: any = []
        for (let i = 0; i < randomNumber.length; i++) {
          newArr.push(res.list.artists[randomNumber[i]])
        }
        // console.log(newArr)
        setArtists((prev: any) => [...prev, ...newArr])
      })
    }

    getArtists(1, 1, 4).then(() => getArtists(2, 4, 2))
  }, [])

  return artists
}

export default useArtists
