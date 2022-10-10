import { useEffect, useState } from "react"
import { OtherMvs, OtherMv } from "../types"
import random from "../utils/random"
import { request } from "../utils/request"

const useArtistMvs = (
  id: number,
  amount: number,
  mvid?: number,
): { type: string; list: OtherMv[] } => {
  const [mvs, setMvs] = useState<OtherMv[]>([])

  useEffect(() => {
    if (id) {
      request("artist/mv", "GET", `&id=${id}`).then((res: OtherMvs) => {
        setMvs(() => random(amount, res.mvs))
      })
    }
  }, [id, mvid])

  return { type: "/mvdetail", list: mvs }
}
export default useArtistMvs
