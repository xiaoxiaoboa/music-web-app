import { ArtistType } from "./Artist"
import { MvType } from "./MV"
import { SongListType } from "./SongList"

/* Home中hooks的type */
interface HomeHooksType {
  type: string
}
interface useSongListsType extends HomeHooksType {
  list: SongListType[]
}
interface useMvType extends HomeHooksType {
  list: MvType[]
}
interface useArtistsType extends HomeHooksType {
  list: ArtistType[]
}

export type { useSongListsType, useMvType, useArtistsType }
