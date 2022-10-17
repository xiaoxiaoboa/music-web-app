import React, { FC, useEffect, useState } from "react"
import { SongDetailType, Track } from "../types"
import { AlbumType } from "../pages/Album/types"
import { request } from "../utils/request"

interface Album {
  picUrl: string
  name: string
  artistId: number
  artistName: string
}

interface StateType {
  album: Album
  songs: Track[]
}

const initialValue = (): StateType => {
  return { album: { picUrl: "", name: "", artistId: 0,artistName:'' }, songs: [] }
}

const useAlbum = (id: number): StateType => {
  const [data, setData] = useState<StateType>(initialValue)

  useEffect(() => {
    request("album", "GET", `&id=${id}`).then((res: AlbumType) => {
      const albumData: Album = {
        picUrl: res.album.blurPicUrl,
        name: res.album.name,
        artistId: res.album.artist.id,
        artistName: res.album.artist.name
      }
      const ids: number[] = res.songs.map(obj => obj.id)
      request("song/detail", "GET", `&ids=${ids.toString()}`).then(
        (res: SongDetailType) => setData({ album: albumData, songs: res.songs })
      )
    })
  }, [id])

  return data
}

export default useAlbum
