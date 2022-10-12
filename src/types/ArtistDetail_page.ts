/* ArtistDetail页面的类型 */

import { Track } from "./Track"

interface TopSong {
  code: number
  more: boolean
  songs: Track[]
}

interface HotAlbum {
  artist: Artist
  hotAlbums: Albums[]
  more: true
  code: 200
}

interface Artist {
  img1v1Id: number
  topicPerson: number
  alias: string[]
  picId: number
  briefDesc: string
  musicSize: number
  albumSize: number
  picUrl: string
  img1v1Url: string
  followed: boolean
  trans: string
  name: string
  id: number
  picId_str: string
  img1v1Id_str: string
}

interface Albums {
  songs: []
  paid: false
  onSale: false
  mark: 0
  awardTags: null
  companyId: 0
  alias: []
  artists: Artist[]
  copyrightId: number
  picId: number
  artist: Artist
  blurPicUrl: string
  publishTime: number
  company: string
  briefDesc: string
  picUrl: string
  commentThreadId: string
  pic: number
  description: string
  tags: string
  status: number
  subType: string
  name: string
  id: number
  type: string
  size: number
  picId_str: string
  isSub: boolean
}

interface useArtistAlbumType {
  type: string
  list: Albums[]
}

interface ArtistDetailType {
  code: 200
  message: string
  data: {
    videoCount: number
    vipRights: null
    identify: {
      imageUrl: string
      imageDesc: string
      actionUrl: string
    }
    artist: {
      id: number
      cover: string
      name: string
      transNames: string[]
      identities: string[]
      identifyTag: string[]
      briefDesc: string
      rank: {
        rank: number
        type: number
      }
      albumSize: number
      musicSize: number
      mvSize: number
    }
    blacklist: boolean
    preferShow: number
    showPriMsg: boolean
    secondaryExpertIdentiy: {
      expertIdentiyId: number
      expertIdentiyName: string
      expertIdentiyCount: number
    }[]
    eventCount: number
    user: {
      backgroundUrl: string
      birthday: number
      detailDescription: string
      authenticated: boolean
      gender: number
      city: number
      signature: string
      description: string
      remarkName: null
      shortUserName: string
      accountStatus: number
      locationStatus: number
      avatarImgId: number
      defaultAvatar: boolean
      province: number
      nickname: string
      expertTags: null
      djStatus: number
      avatarUrl: string
      accountType: number
      authStatus: number
      vipType: number
      userName: string
      followed: boolean
      userId: number
      lastLoginIP: string
      lastLoginTime: number
      authenticationTypes: number
      mutual: boolean
      createTime: number
      anchor: boolean
      authority: number
      backgroundImgId: number
      userType: number
      experts: null
      avatarDetail: {
        userType: number
        identityLevel: number
        identityIconUrl: string
      }
    }
  }
}
export type { TopSong, HotAlbum, Albums, useArtistAlbumType, ArtistDetailType }
