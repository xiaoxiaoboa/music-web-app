import React, { FC, useEffect, useState } from "react"
import { SongDetailType, Track } from "../types"
import { Album, AlbumType } from "../pages/Album/types"
import { request } from "../utils/request"


interface StateType {
  album: Album
  songs: Track[]
}

const initialValue = (): StateType => {
  return { album: {} as Album, songs: [] }
}

const useAlbum = (id: number): StateType => {
  const [data, setData] = useState<StateType>(initialValue)

  useEffect(() => {
    request("album", "GET", `&id=${id}`).then((albumData: AlbumType) => {
      // const albumData: Album = {
      //   id: res.album.id,
      //   picUrl: res.album.blurPicUrl,
      //   name: res.album.name,
      //   artistId: res.album.artist.id,
      //   artistName: res.album.artist.name
      // }
      const ids: number[] = albumData.songs.map(obj => obj.id)
      request("song/detail", "GET", `&ids=${ids.toString()}`).then(
        (res: SongDetailType) => setData({ album: albumData.album, songs: res.songs })
      )
    })
  }, [id])

  return data
}

export default useAlbum
