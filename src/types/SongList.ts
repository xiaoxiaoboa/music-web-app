/* 歌单返回类型(照抄API返回的数据) */
 interface SongListType {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}
 interface SongListsType {
  category: number
  code: number
  hasTaste: boolean
  result: SongListType[]
}

export type { SongListType, SongListsType }