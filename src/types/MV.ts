/* Mv返回类型(照抄API返回的数据) */
 interface MvArtistsType {
  id: number
  name: string
  alias: null
  transNames: null
}
 interface MvType {
  artistId: number
  artistName: string
  artists: MvArtistsType[]
  briefDesc: string
  cover: string
  desc: string
  duration: number
  id: number
  mark: number
  name: string
  playCount: number
  subed: boolean
}
 interface MvsType {
  code: number
  data: MvType[]
  count: number
  hasMore: boolean
}

export type { MvArtistsType, MvType, MvsType }