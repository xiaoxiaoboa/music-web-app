import { useEffect, useState } from "react"
import { RouterPath } from "../types"
import { OtherMv, OtherMvs } from "../pages/MvDetail/types"
import random from "../utils/random"
import { request } from "../utils/request"

/**
 * 获取歌手的MV
 * @param id 歌手ID
 * @param amount 需要的mv数量
 * @param mvid 如果是从MV界面进入的，需要传入mvid
 * @returns 获取到的mv
 */

const useArtistMvs = (
  id: number,
  amount: number,
  mvid?: number
): { type: string; list: OtherMv[] } => {
  const [mvs, setMvs] = useState<OtherMv[]>([])

  useEffect(() => {
    if (id) {
      request("artist/mv", "GET", `&id=${id}`).then((res: OtherMvs) => {
        setMvs(() => random(amount, res.mvs))
      })
    }
  }, [id, mvid])

  return { type: RouterPath.MV, list: mvs }
}
export default useArtistMvs
