// import Media from "../utils/Media"

/* audio状态 */
export interface AudioStateType {
  audio: HTMLMediaElement
  playIndex: number | null
  isPlaying: boolean
  continuousWay: continuousWayEnum
}
export enum continuousWayEnum {
  ORDER = "order",
  SHUFFLE = "shuffle",
  LOOP = "loop",
  LISTLOOP = "listLoop"
}
/* player中歌曲的播放链接和歌曲信息 */
export interface SongUrl {
  br: number
  canExtend: boolean
  code: number
  effectTypes: null
  encodeType: string
  expi: number
  fee: number
  flag: number
  freeTimeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
    type: number
    remainTime: number
  }
  freeTrialInfo: null
  freeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
    listenType: null
  }
  gain: number
  id: number
  level: string
  md5: string
  payed: number
  podcastCtrp: null
  rightSource: number
  size: number
  time: number
  type: string
  uf: null
  url: string
  urlSource: number
}
export interface PlayListUrls {
  code: number
  data: SongUrl[]
}
export interface TrackAndUrl {
  track: Track
  trackUrl: SongUrl
}

/* 二维码API返回类型 */
export interface QRCOdeKeyType {
  code: number
  data: { code: number; unikey: string }
}
/* 二维码img返回类型 */
export interface QRCodeImgType {
  code: number
  data: {
    qrimg: string
    qrurl: string
  }
}
/* 二维码状态返回类型 */
export interface Waiting {
  code: number
  cookie: string
  message: string
}
export interface Authorizing {
  avatarUrl: string
  code: number
  cookie: string
  message: string
  nickname: string
}
export interface AuthSuccess {
  code: number
  cookie: string
  message: string
}
/* 登录状态类型 */
export interface LoginStatusType {
  data: {
    account: {
      anonimousUser: boolean
      ban: number
      baoyueVersion: number
      createTime: number
      donateVersion: number
      id: number
      paidFee: boolean
      status: number
      tokenVersion: number
      type: number
      userName: string
      vipType: number
      whitelistAuthority: number
    }
    code: number
    profile: {
      accountStatus: number
      accountType: number
      anchor: boolean
      authStatus: number
      authenticated: boolean
      authenticationTypes: number
      authority: number
      avatarDetail: null
      avatarImgId: number
      avatarUrl: string
      backgroundImgId: number
      backgroundUrl: string
      birthday: number
      city: number
      createTime: number
      defaultAvatar: boolean
      description: null
      detailDescription: null
      djStatus: number
      expertTags: null
      experts: null
      followed: boolean
      gender: number
      lastLoginIP: string
      lastLoginTime: number
      locationStatus: number
      mutual: boolean
      nickname: string
      province: number
      remarkName: null
      shortUserName: string
      signature: null
      userId: number
      userName: string
      userType: number
      vipType: number
      viptypeVersion: number
    }
  }
}

/* 二维码state类型(reducer) */
export interface QRCodeState {
  key: string
  base64: string
  isLoading: boolean
  message: string
}
export enum QrCodeType {
  KEY = "key",
  BASE64 = "base64",
  IS_LOADING = "isLoading",
  MESSAGE = "message",
  RESET = "reset"
}
export interface QrCodeAction {
  type: QrCodeType
  payload: string | boolean | QRCodeState
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
  alias: null
  transNames: null
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
  count: number
  hasMore: boolean
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
export interface Track {
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
}

export interface TrackIds {
  alg: null
  at: number
  id: number
  rcmdReason: string
  sc: null
  t: number
  uid: number
  v: number
}

export interface SongList {
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
  playlist: SongList
  privileges: privileges[]
  relatedVideos: null
  resEntrance: null
  sharedPrivilege: null
  urls: null
}
/* 歌曲详情state(reducer) */
export interface DetailState {
  isShowIntro: boolean
  loaded: boolean
  detail: SongList
  songs: Track[]
  songsId: number[]
}
export enum DetailType {
  ISHOWINTRO = "isShowIntro",
  LOADED = "loaded",
  DETAIL = "detail",
  SONGS = "songs",
  SONGSID = "songsId"
}
export interface DetailAction {
  type: DetailType
  paylad: boolean | SongList | Track[] | number[]
}
/* 歌曲详情API返回类型 */
export interface SongDetailType {
  code: number
  privileges: {
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
      listenType: null
    }
    id: number
    maxBrLevel: string
    maxbr: number
    payed: number
    pl: number
    plLevel: string
    playMaxBrLevel: string
    playMaxbr: number
    preSell: boolean
    rscl: null
    sp: number
    st: number
    subp: number
    toast: boolean
  }[]
  songs: Track[]
}

/* Home中hooks的type */
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

/* locationP type */
export interface LocationProps {
  hash: string
  key: string
  pathname: string
  search: string
  state: { id: number }
}

/* MV详情页 type */
export interface MvDataType {
  bufferPic: string
  bufferPicFS: string
  code: number
  data: Data
  loadingPic: string
  loadingPicFS: string
  mp: Mp
  subed: boolean
}
interface Mp {
  cp: number
  dl: number
  fee: number
  id: number
  msg: boolean
  mvFee: boolean
  normal: boolean
  payed: number
  pl: number
  sid: number
  st: number
  unauthorized: boolean
}
export interface Data {
  artistId: number
  artistName: string
  artists: {
    followed: boolean
    id: number
    img1v1Url: string
    name: string
  }[]
  briefDesc: string
  brs: {
    br: number
    point: number
    size: number
  }[]
  commentCount: number
  commentThreadId: string
  cover: string
  coverId: number
  coverId_str: string
  desc: string
  duration: number
  id: number
  nType: number
  name: string
  playCount: number
  price: null
  publishTime: string
  shareCount: number
  subCount: number
  videoGroup: []
}
export interface MvUrl {
  code: number
  data: MvUrlData
}
export interface MvUrlData {
  id: number
  url: string
  r: number
  size: number
  md5: string
  code: number
  expi: number
  fee: number
  mvFee: number
  st: number
  promotionVo: null
  msg: string
}
/* 歌手其他MV */
export interface OtherMvs {
  mvs: OtherMv[]
  time: number
  hasMore: boolean
  code: number
}
export interface OtherMv {
  id: number
  name: string
  status: number
  artist: {
    img1v1Id: number
    topicPerson: number
    picUrl: string
    img1v1Url: string
    briefDesc: string
    albumSize: number
    trans: string
    musicSize: number
    alias: string[]
    name: string
    id: number
    picId: number
    img1v1Id_str: string
  }
  imgurl16v9: string
  imgurl: string
  artistName: string
  duration: number
  playCount: number
  publishTime: string
  subed: boolean
}
/* 相似MVs */
export interface SimilarMvs {
  mvs: SimilarMv[]
  code: number
}
export interface SimilarMv {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: string
  desc: null
  artistName: string
  artistId: number
  duration: number
  mark: number
  artists: SimilarMvArtist[]
  alg: string
}
interface SimilarMvArtist {
  id: number
  name: string
  alias: string[]
  transNames: null
}
