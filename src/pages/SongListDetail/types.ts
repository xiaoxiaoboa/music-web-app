import { Track, TrackIds } from "../../types/Track"

/* 歌单详情页 */
interface SongList {
  adType: number
  algTags: null
  backgroundCoverId: number
  backgroundCoverUrl: null
  cloudTrackCount: number
  commentCount: number
  commentThreadId: string
  copied: boolean
  coverImgId: number
  coverImgId_str: null
  coverImgUrl: string
  createTime: number
  creator: {
    accountStatus: number
    anchor: boolean
    authStatus: number
    authenticationTypes: number
    authority: number
    avatarDetail: {
      identityIconUrl: string
      identityLevel: number
      userType: number
    }
    avatarImgId: number
    avatarImgIdStr: string
    avatarUrl: string
    backgroundImgId: number
    backgroundImgIdStr: number
    backgroundUrl: string
    birthday: number
    city: number
    defaultAvatar: boolean
    description: string
    detailDescription: string
    djStatus: number
    expertTags: string[]
    experts: null
    followed: boolean
    gender: number
    mutual: boolean
    nickname: string
    province: number
    remarkName: null
    signature: string
    userId: number
    userType: number
    vipType: number
  }
  description: string
  englishTitle: null
  gradeStatus: string
  highQuality: boolean
  historySharedUsers: null
  id: number
  name: string
  newImported: boolean
  officialPlaylistType: null
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  remixVideo: null
  score: null
  shareCount: number
  sharedUsers: null
  specialType: number
  status: number
  subscribed: null
  subscribedCount: number
  subscribers: {
    accountStatus: number
    anchor: boolean
    authStatus: number
    authenticationTypes: number
    authority: number
    avatarDetail: null
    avatarImgId: number
    avatarImgIdStr: string
    avatarImgId_str: string
    avatarUrl: string
    backgroundImgId: number
    backgroundImgIdStr: string
    backgroundUrl: string
    birthday: number
    city: number
    defaultAvatar: boolean
    description: string
    detailDescription: string
    djStatus: number
    expertTags: null
    experts: null
    followed: boolean
    gender: number
    mutual: boolean
    nickname: string
    province: number
    remarkName: null
    signature: string
    userId: number
    userType: number
    vipType: number
  }[]
  tags: string[]
  titleImage: number
  titleImageUrl: null
  trackCount: number
  trackIds: TrackIds[]
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: Track[]
  updateFrequency: null
  updateTime: number
  userId: number
  videoIds: null
  videos: null
}
interface privileges {
  chargeInfoList: {
    chargeMessage: null
    chargeType: number
    chargeUrl: null
    rate: number
  }[]
  cp: number
  cs: boolean
  dl: number
  dlLevel: string
  downloadMaxBrLevel: string
  downloadMaxbr: number
  fee: number
  fl: number
  flLevel: string
  flag: number
  freeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
    listenType: boolean
  }
  id: number
  maxBrLevel: string
  maxbr: number
  paidBigBang: boolean
  payed: number
  pc: null
  pl: number
  plLevel: string
  playMaxBrLevel: string
  playMaxbr: number
  preSell: boolean
  realPayed: number
  rscl: number
  sp: number
  st: number
  subp: number
  toast: boolean
}
interface SongListsDetailType {
  code: number
  playlist: SongList
  privileges: privileges[]
  relatedVideos: null
  resEntrance: null
  sharedPrivilege: null
  urls: null
}

/* 歌曲详情state(reducer) */
interface DetailState {
  isShowIntro: boolean
  loaded: boolean
  detail: SongList
  songs: Track[]
  songsId: number[]
}
enum DetailType {
  ISHOWINTRO = "isShowIntro",
  LOADED = "loaded",
  DETAIL = "detail",
  SONGS = "songs",
  SONGSID = "songsId"
}
interface DetailAction {
  type: DetailType
  paylad: boolean | SongList | Track[] | number[]
}

export type {
  SongList,
  privileges,
  SongListsDetailType,
  DetailState,
  DetailAction
}

export { DetailType }
