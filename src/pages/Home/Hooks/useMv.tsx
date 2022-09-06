import React, { useEffect, useState } from "react"
import { recommendedMv } from "../../../utils/request"
import random from "../../../utils/random"
import { MvsType, MvType } from "../../../types"
import { useRecoilState } from "recoil"
import { HomeMvsState } from "../../../recoil"
import { useMvType } from "../../../types"


const useMv = (): useMvType => {
  const [list, setList] = useRecoilState(HomeMvsState)

  useEffect(() => {
    if (list.length > 0) return
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
      setList(() => newArr)
    })
  }, [])

  // useEffect(() => {console.log(list)},[list])

  return { type: "mvdetail", list }
}

export default useMv
