import { AnyStyledComponent } from "styled-components"
import { Track } from "../../types"
import { Album } from "../Album/types"
import { Artist } from "../ArtistDetail/types"
import { MvType } from "../Home/types"

interface SearchSongsType {
  code: number
  result: {
    searchQcReminder: null
    songCount: number
    songs: Track[]
  }
}
interface SearchAlbumType {
  code: number
  result: {
    albumCount: number
    albums: Album[]
  }
}

interface ReducerStateType {
  songs: Track[]
  albums: Album[]
  artists: Artist[]
  mvs: MvType[]
}

enum ReducerType {
  SONGS = "songs",
  ALBUMS = 'albums',
  ARTISTS ='artists',
  MVS='mvs'
}

interface ReducerActionType {
  type: ReducerType
  payload: Track[] | Album[] | Artist[] | MvType[]
}

export type {
  SearchSongsType,
  ReducerStateType,
  ReducerActionType,
  SearchAlbumType
}
export { ReducerType }
