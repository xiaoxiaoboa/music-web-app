
/* Home中hooks的type */
interface HomeHooksType {
  type: string
}
interface useSongListsType extends HomeHooksType {
  list: SongListType[]
}
interface useMvType extends HomeHooksType {
  list: MvType[]
}
interface useArtistsType extends HomeHooksType {
  list: ArtistType[]
}


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


export type {
  useSongListsType,
  useMvType,
  useArtistsType,
  SongListType,
  SongListsType,
  MvArtistsType,
  MvType,
  MvsType,
  ArtistType,
  ArtistsListType,
  ArtistsType
}
