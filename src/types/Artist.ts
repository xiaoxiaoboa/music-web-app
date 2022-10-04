/* 歌手返回类型(照抄API返回的数据) */
interface ArtistType {
  albumSize: number
  alias: string[]
  briefDesc: string
  id: number
  img1v1Id: number
  img1v1Id_str: string
  img1v1Url: string
  lastRank: number
  musicSize: number
  name: string
  picId: number
  picId_str: string
  picUrl: string
  score: number
  topicPerson: number
  trans: string
}
interface ArtistsListType {
  artists: ArtistType[]
  type: number
  updateTime: number
}
interface ArtistsType {
  code: number
  list: ArtistsListType
}

export  type { ArtistType, ArtistsListType, ArtistsType }
