import { atom } from "recoil"
import { SongListType, MvType, ArtistType, PlayList } from "../types"

/* 主题state */
export const ThemeState = atom<boolean>({
  key: "Theme",
  default: true
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
export const SongListDetailState = atom<PlayList>({
  key: "SongListDetail",
  default: undefined
})
