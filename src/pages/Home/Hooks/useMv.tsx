import React, { useEffect, useState } from "react"
import { recommendedMv } from "../../../utils/request"
import random from "../../../utils/random"
import { MvsType, MvType } from "../../../types"
import { useRecoilState } from "recoil"
import { HomeMvsState } from "../../../recoil"

const useMv = (): MvType[] => {
  const [mvs, setMvs] = useRecoilState(HomeMvsState)

  useEffect(() => {
    if(mvs.length > 0) return
    recommendedMv("mv/first").then((res: MvsType) => {
      const randomNumber: number[] = random(
        0,
        res.data.length - 1,
        3
      ) as number[]
      const newArr: any = []
      for (let i = 0; i < randomNumber.length; i++) {
        newArr.push(res.data[randomNumber[i]])
      }
      setMvs(() => newArr)
    })
  }, [])

  // useEffect(() => {console.log(mvs)},[mvs])

  return mvs
}

export default useMv
