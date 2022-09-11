import React, { useEffect, useState } from "react"
import { request } from "../../../utils/request"
import random from "../../../utils/random"
import { MvsType, MvType } from "../../../types"
import { useRecoilState } from "recoil"
import { HomeMvsState } from "../../../recoil/atom"
import { useMvType } from "../../../types"


const useMv = (): useMvType => {
  const [list, setList] = useRecoilState(HomeMvsState)

  useEffect(() => {
    if (list.length > 0) return
    request("mv/first", "GET").then((res: MvsType) => {
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
