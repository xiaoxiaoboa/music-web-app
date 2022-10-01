import { atom } from "recoil"
import {
  SongList,
  AudioStateType,
  PlayMode,
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
    playIndex: localStorage.getItem("audiostate")
      ? JSON.parse(localStorage.getItem("audiostate") as string).playIndex
      : null,
    isPlaying: false,
    canPlay: false,
    playMode: localStorage.getItem("audiostate")
      ? JSON.parse(localStorage.getItem("audiostate") as string).playMode
      : PlayMode.LISTLOOP
  }
  // effects: [
  //   ({ node, onSet }) => {
  //     onSet((newValue, oldValue) => {
  //       console.log(newValue)
  //     })
  //   }
  // ]
})

/* 音频歌单 */
export const PlayListState = atom<Track[]>({
  key: "PlayList",
  default: localStorage.getItem("audiolist")
    ? JSON.parse(localStorage.getItem("audiolist") as string)
    : []
  // effects: [
  //   ({ node, onSet }) => {
  //     onSet((newValue, oldValue) => {
  //       console.log(newValue)
  //     })
  //   }
  // ]
})
/* =================================== */

/* 歌单详情页 */
export const SongListDetailState = atom<DetailState>({
  key: "SongListDetail",
  default: {
    isShowIntro: false,
    loaded: false,
    detail: {} as SongList,
    songs: [],
    songsId: []
  }
})
