import React, { FC, ReactElement, useEffect, useReducer,memo } from "react"
import { Location, useLocation } from "react-router-dom"
import styled from "styled-components"
import List from "../../components/List"
import { addMessage } from "../../components/Snackbar"
import SongsList from "../../components/SongsList"
import { RouterPath, Track } from "../../types"
import { request } from "../../utils"
import { Album } from "../Album/types"
import { Artist } from "../ArtistDetail/types"
import { MvType } from "../Home/types"
import { ReducerActionType, ReducerStateType, ReducerType } from "./types"

interface LocationType extends Location {
  state: {
    value: string
  }
}

const reducer = (state: ReducerStateType, action: ReducerActionType) => {
  const { type, payload } = action
  switch (type) {
    case ReducerType.SONGS:
      return { ...state, ...{ songs: payload as Track[] } }
    case ReducerType.ALBUMS:
      return { ...state, ...{ albums: payload as Album[] } }
    case ReducerType.ARTISTS:
      return { ...state, ...{ artists: payload as Artist[] } }
    case ReducerType.MVS:
      return { ...state, ...{ mvs: payload as MvType[] } }
  }
}
const initialState: ReducerStateType = {
  songs: [],
  albums: [],
  artists: [],
  mvs: []
}

const Search: FC = (): ReactElement => {
  const location = useLocation() as LocationType
  const [result, setResult] = useReducer(reducer, initialState)

  useEffect(() => {
    requestData(1, 10, ReducerType.SONGS, "songs")
    requestData(10, 10, ReducerType.ALBUMS, "albums")
    requestData(100, 6, ReducerType.ARTISTS, "artists")
    requestData(1004, 3, ReducerType.MVS, "mvs")
  }, [location.state.value])

  /* 请求数据 */
  const requestData = async (
    type: number,
    limit: number,
    reducerType: ReducerType,
    payload: string
  ): Promise<void> => {
    await request(
      "cloudsearch",
      "GET",
      `&type=${type}&keywords=${location.state.value}&limit=${limit}`
    )
      .then(res => {
        if (res.code === 200) {
          setResult({ type: reducerType, payload: res.result[`${payload}`] })
        }else{
          addMessage("网络错误，稍后重试")
        }
      })
      .catch(err => addMessage("网络错误，稍后重试"))
  }

  /* 随机IP 字符串 */
  const randomIP = (): string => {
    let ip: number[] = []
    for (var i = 0; i < 4; i++) {
      ip.push(Math.floor(Math.random() * 256))
    }
    return ip.toString().replace(/,/gi, ".")
  }

  return (
    <Container>
      <Title>搜索{` "${location.state.value}" `}的结果</Title>
      <div className="songslist">
        {result.songs.length < 1 ? <></> : <Title>单曲</Title>}
        <SongsList data={result.songs} />
      </div>
      <div className="albums">
        {result.albums.length < 1 ? <></> : <Title>专辑</Title>}
        <List
          datas={{ type: RouterPath.ALBUM, list: result.albums }}
          amount={5}
          w={300}
          h={300}
        />
      </div>
      <div className="artists">
        {result.artists.length < 1 ? <></> : <Title>歌手</Title>}
        <List
          datas={{ type: RouterPath.ARTIST, list: result.artists }}
          w={400}
          h={400}
          amount={6}
          borderRadius={`50%`}
          alignItems={`center`}
        />
      </div>
      <div className="mvs">
        {result.mvs.length < 1 ? <></> : <Title>Mvs</Title>}
        <List
          amount={3}
          borderRadius={`1.25rem`}
          alignItems={`center`}
          datas={{ type: RouterPath.MV, list: result.mvs }}
          w={464}
          h={260}
        />
      </div>
    </Container>
  )
}

export default memo(Search)

const Container = styled.div`
  /* padding: 0 calc(10% - 17px) 1.25rem 10%; */
  padding: 0 10% 1.25rem 10%;
  display: flex;
  flex-direction: column;

  .songslist,
  .albums,
  .artists,
  .mvs {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`
const Title = styled.h1`
  margin-top: 20px;
`
