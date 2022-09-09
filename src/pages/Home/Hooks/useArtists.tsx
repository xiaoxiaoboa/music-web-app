import React, { useEffect, useState } from "react"
import {  request } from "../../../utils/request"
import random from "../../../utils/random"
import { ArtistsType, ArtistType } from "../../../types"
import { useRecoilState } from "recoil"
import { HomeArtistsState } from "../../../recoil"
import { useArtistsType } from "../../../types"

const useArtists = (): useArtistsType => {
  const [list, setList] = useRecoilState(HomeArtistsState)

  useEffect(() => {
    if (list.length > 0) return
    const getArtists = async (min: number, max: number, amount: number) => {
      await request(
        "toplist/artist",
        "GET",
        `&type=${random(min, max) as number}`
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
        setList((prev: any) => [...prev, ...newArr])
      })
    }

    getArtists(1, 1, 4).then(() => getArtists(2, 4, 2))
  }, [])

  return { type: "artistdetail", list }
}

export default useArtists
