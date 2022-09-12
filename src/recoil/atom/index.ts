import { atom } from "recoil"
import MyAudio from '../../utils/MyAudio'
import {
  SongListType,
  MvType,
  ArtistType,
  SongList,
  TrackAndUrl,
  AudioStateType,
  continuousWayEnum
} from "../../types"

/* 主题state */
export const ThemeState = atom<boolean>({
  key: "Theme",
  default: true
})

export const AudioState = atom<AudioStateType>({
  key: "playerState",
  default: {
    audio: new MyAudio(""),
    playIndex: 0,
    isPlaying: false,
    continuousWay: continuousWayEnum.ORDER,
    playList: []
  }
})

/* 播放状态 */
export const isPlayingState = atom<boolean>({
  key: "isPlaying",
  default: false
})

/* 是否再拖拽进度条 */
export const isInterActiveState = atom<boolean>({
  key: "isInterActive",
  default: false
})

/* 主页歌单 */
export const HomeSongListsState = atom<SongListType[]>({
  key: "songlists",
  default: []
})

/* 主页歌手 */
export const HomeArtistsState = atom<ArtistType[]>({
  key: "artists",
  default: []
})

/* 主页mv */
export const HomeMvsState = atom<MvType[]>({
  key: "mvs",
  default: []
})

/* 歌单详情页 */
export const SongListDetailState = atom<SongList>({
  key: "SongListDetail",
  default: undefined
})

/* 歌曲url和歌曲信息 */
export const PlayListState = atom<TrackAndUrl[]>({
  key: "PlayList",
  default: []
})
