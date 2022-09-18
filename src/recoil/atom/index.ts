import { atom } from "recoil"
import MyAudio from "../../utils/MyAudio"
import {
  SongListType,
  MvType,
  ArtistType,
  SongList,
  TrackAndUrl,
  AudioStateType,
  continuousWayEnum,
  DetailState,
  Track
} from "../../types"

/* 主题state */
export const ThemeState = atom<boolean>({
  key: "Theme",
  default: true
})


/* ===========播放器操作相关============ */
/* 音频播放器state */
export const AudioState = atom<AudioStateType>({
  key: "playerState",
  default: {
    audio: new Audio(),
    // currentTime: 0,
    // duration: 0,
    playIndex: null,
    isPlaying: false,
    continuousWay: continuousWayEnum.SHUFFLE
  },
  effects: [
    ({ node, onSet }) => {
      onSet((newValue, oldValue) => {
        console.log(newValue)
      })
    }
  ]
})
/* 播放状态 */
export const isPlayingState = atom<boolean>({
  key: "isPlaying",
  default: false
})

/* 音频歌单 */
export const PlayListState = atom<Track[]>({
  key: "PlayList",
  default: [],
  // effects: [
  //   ({ node, onSet }) => {
  //     onSet((newValue, oldValue) => {
  //       console.log(newValue)
  //     })
  //   }
  // ]
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
export const SongListDetailState = atom<DetailState>({
  key: "SongListDetail",
  default: {
    isShowIntro: false,
    loaded: false,
    detail: {} as SongList,
    songs: [],
    songsId: []
  },
  effects: [
    ({ node, onSet }) => {
      onSet((newValue, oldValue) => {
        console.log(newValue)
      })
    }
  ]
})
