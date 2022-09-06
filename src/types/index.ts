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

/* 歌单详情 */
export interface PlayList {
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
    trackIds: {
      alg: null
      at: number
      id: number
      rcmdReason: string
      sc: null
      t: number
      uid: number
      v: number
    }[]
    trackNumberUpdateTime: number
    trackUpdateTime: number
    tracks: {
      a: null
      al: {
        id: number
        name: string
        pic: number
        picUrl: string
        pic_str: string
        tns: string[]
      }
      alia: []
      ar: { alias: []; id: number; name: string; tns: [] }[]
      cd: string
      cf: string
      copyright: number
      cp: number
      crbt: null
      djId: number
      dt: number
      entertainmentTags: null
      fee: number
      ftype: number
      h: { br: number; fid: number; size: number; vd: number; sr: number }
      hr: null
      id: number
      l: { br: number; fid: number; size: number; vd: number; sr: number }
      m: { br: number; fid: number; size: number; vd: number; sr: number }
      mark: number
      mst: number
      mv: number
      name: string
      no: number
      noCopyrightRcmd: null
      originCoverType: number
      originSongSimpleData: null
      pop: number
      pst: number
      publishTime: number
      resourceState: boolean
      rt: string
      rtUrl: null
      rtUrls: []
      rtype: number
      rurl: null
      s_id: number
      single: number
      songJumpInfo: null
      sq: { br: number; fid: number; size: number; vd: number; sr: number }
      st: number
      t: number
      tagPicList: null
      tns: string[]
      v: number
      version: number
    }[]
    updateFrequency: null
    updateTime: number
    userId: number
    videoIds: null
    videos: null
  }
export interface privileges {
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
export interface SongListsDetailType {
  code: number
  playlist: PlayList
  privileges: privileges[]
  relatedVideos: null
  resEntrance: null
  sharedPrivilege: null
  urls: null
}

interface HomeHooksType {
  type: string
}
export interface useSongListsType extends HomeHooksType {
  list: SongListType[]
}
export interface useMvType extends HomeHooksType {
  list: MvType[]
}
export interface useArtistsType extends HomeHooksType {
  list: ArtistType[]
}
