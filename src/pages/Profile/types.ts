import { SongList } from "../SongListDetail/types"


interface userPlayList {
  code: number
  more: boolean
  playlist: SongList[]
  version: number
}

interface playList  {
  adType: number
  anonimous: boolean
  artists: null
  backgroundCoverId: number
  backgroundCoverUrl: null
  cloudTrackCount: number
  commentThreadId: string
  copied: boolean
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  creator: {
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
  }
  description: null
  englishTitle: null
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  recommendInfo: null
  shareStatus: null
  sharedUsers: null
  specialType: number
  status: number
  subscribed: boolean
  subscribedCount: number
  subscribers: []
  tags: []
  titleImage: number
  titleImageUrl: null
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: null
  updateFrequency: null
  updateTime: number
  userId: number
}

export type { userPlayList, playList }
