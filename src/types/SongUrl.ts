/* player中歌曲的播放链接和歌曲信息 */
interface SongUrl {
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
interface PlayListUrls {
  code: number
  data: SongUrl[]
}
interface TrackAndUrl {
  // track: Track
  trackUrl: SongUrl
}

export type { SongUrl, PlayListUrls, TrackAndUrl }
