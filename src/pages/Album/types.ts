interface AlbumType {
  resourceState: boolean
  songs: Album_Songs[]
  code: number
  album: Album
  info: {
    commentThread: {
      id: string
      resourceInfo: {
        id: number
        userId: number
        name: string
        imgUrl: string
        creator: null
        encodedId: null
        subTitle: null
        webUrl: null
      }
      resourceType: number
      commentCount: number
      likedCount: number
      shareCount: number
      hotCount: number
      latestLikedUsers: null
      resourceId: number
      resourceOwnerId: number
      resourceTitle: string
    }
    latestLikedUsers: null
    liked: boolean
    comments: null
    resourceType: number
    resourceId: number
    commentCount: number
    likedCount: number
    shareCount: number
    threadId: string
  }
}


interface Album  {
  songs: []
  paid: boolean
  onSale: boolean
  mark: number
  awardTags: null
  companyId: number
  alias: string[]
  artists: {
    img1v1Id: number
    topicPerson: number
    trans: string
    alias: string[]
    picId: number
    followed: boolean
    picUrl: string
    musicSize: number
    albumSize: number
    briefDesc: string
    img1v1Url: string
    name: string
    id: number
    img1v1Id_str: string
  }[]
  copyrightId: number
  picId: number
  artist: {
    img1v1Id: number
    topicPerson: number
    trans: string
    alias: string[]
    picId: number
    followed: boolean
    picUrl: string
    musicSize: number
    albumSize: number
    briefDesc: string
    img1v1Url: string
    name: string
    id: number
    picId_str: string
    img1v1Id_str: string
  }
  picUrl: string
  briefDesc: string
  publishTime: number
  company: string
  pic: number
  commentThreadId: string
  blurPicUrl: string
  tags: string
  description: string
  status: number
  subType: string
  name: string
  id: number
  type: string
  size: number
  picId_str: string
}
interface Album_Songs{
    rtUrls: []
    ar: {
      id: number
      name: string
      alia: string[]
    }[]

    al: {
      id: number
      name: string
      picUrl: string
      pic_str: string
      pic: number
    }
    st: number
    noCopyrightRcmd: null
    songJumpInfo: null
    rurl: null
    pst: number
    alia: string[]
    pop: number
    rt: string
    mst: number
    cp: number
    crbt: null
    cf: string
    dt: number
    rtUrl: null
    ftype: number
    rtype: number
    cd: string
    mv: number
    no: number
    fee: number
    djId: number
    t: number
    v: number
    h: {
      br: number
      fid: number
      size: number
      vd: number
      sr: number
    }
    l: {
      br: number
      fid: number
      size: number
      vd: number
      sr: number
    }
    sq: {
      br: number
      fid: number
      size: number
      vd: number
      sr: number
    }
    hr: null
    a: null
    m: {
      br: number
      fid: number
      size: number
      vd: number
      sr: number
    }
    name: string
    id: number
    privilege: {
      id: number
      fee: number
      payed: number
      st: number
      pl: number
      dl: number
      sp: number
      cp: number
      subp: number
      cs: boolean
      maxbr: number
      fl: number
      toast: boolean
      flag: number
      preSell: boolean
      playMaxbr: number
      downloadMaxbr: number
      maxBrLevel: string
      playMaxBrLevel: string
      downloadMaxBrLevel: string
      plLevel: string
      dlLevel: string
      flLevel: string
      rscl: null
      freeTrialPrivilege: {
        resConsumable: boolean
        userConsumable: boolean
        listenType: null
      }
      chargeInfoList: {
        rate: number
        chargeUrl: null
        chargeMessage: null
        chargeType: number
      }[]
    }
  }


  interface LikedAlbums {
    data: Album[]
    count: number
    hasMore: boolean
    paidCount: number
    code: number
  }

export type { AlbumType, Album, Album_Songs, LikedAlbums }
