/* MV详情页 type */
 interface MvDataType {
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
 interface Data {
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
 interface MvUrl {
  code: number
  data: MvUrlData
}
 interface MvUrlData {
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
 interface OtherMvs {
  mvs: OtherMv[]
  time: number
  hasMore: boolean
  code: number
}
 interface OtherMv {
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

export type { MvDataType, Data, MvUrl, MvUrlData, OtherMvs, OtherMv }