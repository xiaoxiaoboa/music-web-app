import { atom } from "recoil"
import {
  SongListType,
  MvType,
  ArtistType,
  SongList,
  TrackAndUrl
} from "../types"

/* 主题state */
export const ThemeState = atom<boolean>({
  key: "Theme",
  default: true
})

/* 播放状态 */
export const isPlayingState = atom<boolean>({
  key: 'isPlaying',
  default: false
})

/* 主页歌单 */
export const HomeSongListsState = atom<SongListType[]>({
  key: "songlists",
  default: []
})

/* 主页歌手 */
export const HomeArtistsState = atom<ArtistType[]>({
  key: 'artists',
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

export const PlayListState = atom<TrackAndUrl[]>({
  key: "PlayList",
  default: []
})

