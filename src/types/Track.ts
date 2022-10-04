/* 歌曲 */
interface Track {
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

interface TrackIds {
  alg: null
  at: number
  id: number
  rcmdReason: string
  sc: null
  t: number
  uid: number
  v: number
}


/* 歌曲详情API返回类型 */
 interface SongDetailType {
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

export type { Track, TrackIds, SongDetailType }
