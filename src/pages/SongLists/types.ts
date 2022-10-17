interface SongListsType {
  cat: string
  code: number
  playlists: PlayListsType[]
  more: boolean
  total: number
}

interface PlayListsType {
  adType: number
  alg: string
  anonimous: boolean
  cloudTrackCount: number
  commentCount: number
  commentThreadId: string
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  coverStatus: number
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
  description: string
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  ordered: boolean
  playCount: number
  privacy: number
  recommendInfo: null
  shareCount: number
  specialType: number
  status: number
  subscribed: boolean
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
  }
  tags: string[]
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: null
  updateTime: number
  userId: number
}

enum CategoryType {
  ALL = "全部",
  CHINESE = "华语",
  LIGHTMUSIC = "轻音乐",
  POPULAR = "流行",
  EAA = "欧美",
  BALLAD = "民谣",
  CANTONESE='粤语',
  CLASSICAL='古典'
}

export type { SongListsType, PlayListsType }
export { CategoryType }