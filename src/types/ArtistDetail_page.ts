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
  artists:Artist[]
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
export type { TopSong, HotAlbum, Albums, useArtistAlbumType }
