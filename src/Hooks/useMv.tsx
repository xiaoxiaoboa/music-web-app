import React, { useEffect, useState } from "react"
import { request } from "../utils/request"
import { MvsType, MvType } from "../types"
import { useMvType } from "../types"
import random from "../utils/random"

/**
 * Home页面的mv
 * @param amount 数量，获取amount个 
 * @returns type: 用作路由导航, list: mv数组
 */

const useMv = (amount: number): useMvType => {
  const [list, setList] = useState<MvType[]>([])

  useEffect(() => {
    /* 获取100首MV */
    request("mv/all", "GET", `&limit=100`).then((res: MvsType) => {
      setList(() => random(amount, res.data))
    })
  }, [])

  return { type: "/mvdetail", list }
}

export default useMv
