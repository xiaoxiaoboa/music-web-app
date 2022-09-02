/* 二维码API返回的类型 */
export interface QRCodeState {
  key: string
  base64: string
  isLoading: boolean
}
export enum QrCodeType {
  KEY = "key",
  BASE64 = "base64",
  IS_LOADING = "isLoading"
}
export interface QrCodeAction {
  type: QrCodeType
  payload: string | boolean
}

/* 歌单返回类型(照抄API返回的数据) */
export interface SongListType {
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
export interface SongListsType {
  category: number
  code: number
  hasTaste: boolean
  result: SongListType[]
}

/* Mv返回类型(照抄API返回的数据) */
export interface MvArtistsType {
  id: number
  name: string
}
export interface MvType {
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
export interface MvsType {
  code: number
  data: MvType[]
}

/* 歌手返回类型(照抄API返回的数据) */
export interface ArtistType {
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
export interface ArtistsListType {
  artists: ArtistType[]
  type: number
  updateTime: number
}
export interface ArtistsType {
  code: number
  list: ArtistsListType
}
