import { useEffect, useState } from "react"
import { OtherMvs, OtherMv } from "../../../types"
import random from "../../../utils/random"
import { request } from "../../../utils/request"

const useArtistMvs = (
  id: number,
  mvid: number,
  amount: number
): { type: string; list: OtherMv[] } => {
  const [mvs, setMvs] = useState<OtherMv[]>([])
  useEffect(() => {
    if (id) {
      request("artist/mv", "GET", `&id=${id}`).then((res: OtherMvs) => {
        if (res.mvs.length <= amount) {
          setMvs(() => res.mvs)
        } else {
          setMvs(() => random(amount, res.mvs))
        }
      })
    }
  }, [id, mvid])


  return { type: "/mvdetail", list: mvs }
}
export default useArtistMvs
