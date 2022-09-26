import React, { useEffect, useState } from "react"
import { request } from "../../../utils/request"
import { MvsType, MvType } from "../../../types"
import { useMvType } from "../../../types"
import random from "../../../utils/random"

const useMv = (amount: number): useMvType => {
  const [list, setList] = useState<MvType[]>([])

  useEffect(() => {
    if (list.length > 0) return
    /* 获取100首MV */
    request("mv/all", "GET", `&limit=100`).then((res: MvsType) => {
      if (res.data.length <= amount) {
        setList(() => res.data)
      } else {
        setList(() => random(amount, res.data))
      }
    })
  }, [])

  return { type: "/mvdetail", list }
}

export default useMv
