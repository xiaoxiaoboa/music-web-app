import React, {
  useEffect,
  useMemo,
  useReducer,
  ReactElement,
  FC,
  memo
} from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import { FaPlay } from "react-icons/fa"
import { BsFolderPlus } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { request } from "../../utils/request"
import { Track, SongDetailType, LocationProps, FontColor } from "../../types"
import {
  SongListsDetailType,
  SongList,
  DetailState,
  DetailAction,
  DetailType
} from "./types"
import {
  AudioState,
  PlayListState,
  UserLikedPlayLists,
  UserState
} from "../../recoil"
import Loading from "../../components/Loading"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import useScroll from "./useScroll"
import getNewUrl from "../../utils/getNewUrl"
import SongsList from "../../components/SongsList"
import { addMessage } from "../../components/Snackbar"
import SpecialFont from "../../components/SpecialFont"
import Button from "../../components/Button"

const reducer = (state: DetailState, action: DetailAction): DetailState => {
  const { type, paylad } = action
  switch (type) {
    case DetailType.ISHOWINTRO:
      return { ...state, ...{ isShowIntro: paylad as boolean } }
    case DetailType.LOADED:
      return { ...state, ...{ loaded: paylad as boolean } }
    case DetailType.DETAIL:
      return { ...state, ...{ detail: paylad as SongList } }
    case DetailType.SONGSID:
      return { ...state, ...{ songsId: paylad as number[] } }
    case DetailType.SONGS:
      return {
        ...state,
        ...{ songs: [...state.songs, ...(paylad as Track[])] }
      }

    default:
      return state
  }
}

const initialState: DetailState = {
  isShowIntro: false,
  loaded: false,
  detail: {} as SongList,
  songs: [] as Track[],
  songsId: [] as number[]
}

const SongListDetail: FC = (): ReactElement => {
  const location = useLocation() as LocationProps
  const setAudioState = useSetRecoilState(AudioState)
  const setPlayList = useSetRecoilState(PlayListState)
  const [reducerState, dispatch] = useReducer(reducer, initialState)
  const [tracks, requesting, requestSongs] = useScroll(reducerState.songsId)
  const userInfo = useRecoilValue(UserState)
  const [userLikedPlayLists, setUserPlayLists] =
    useRecoilState(UserLikedPlayLists)

  useEffect(() => {
    request("playlist/detail", "GET", `&id=${location.state.id}`).then(
      (res: SongListsDetailType) => {
        /* ???????????? */
        dispatch({ type: DetailType.DETAIL, paylad: res.playlist })
        /* ????????????????????????ID */
        dispatch({
          type: DetailType.SONGSID,
          paylad: res.playlist.trackIds.map(obj => obj.id)
        })
        return dispatch({ type: DetailType.LOADED, paylad: true })
      }
    )
  }, [location.state.id])

  /* ????????????????????? */
  const getUpdateTime = useMemo(
    () =>
      (value: number): string => {
        const re = /\//gi
        const str = new Date(value).toLocaleDateString()
        const newStr = str.replace(re, "-")
        return newStr
      },
    [reducerState.detail]
  )

  /* ?????????????????? */
  const handlePlayAll = (): void => {
    request("playlist/track/all", "GET", `&id=${location.state.id}`).then(
      (res: SongDetailType) => {
        addMessage("??????????????????????????????...")
        setPlayList(res.songs)
        setAudioState(prev => ({ ...prev, playIndex: null }))
      }
    )
  }

  /* ???????????????????????????????????? */
  const handleLikeSongList = (value: number) => {
    if (!userInfo) return addMessage("??????????????????")
    const isLiked =
      userLikedPlayLists.findIndex(obj => obj.id === reducerState.detail.id) >
      -1
        ? 2
        : 1

    request("playlist/subscribe", "GET", `&t=${isLiked}&id=${value}`)
      .then(res => {
        if (res.code === 200) {
          if (isLiked === 2) {
            setUserPlayLists(prev =>
              prev.filter(obj => obj.id !== reducerState.detail.id)
            )
            addMessage("???????????????")
          } else if (isLiked === 1) {
            setUserPlayLists(prev => [...prev, reducerState.detail])
            addMessage("?????????")
          }
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {reducerState.loaded ? (
        <Container>
          <>
            <SongListInfo>
              <CoverImg>
                <img src={getNewUrl(reducerState.detail?.coverImgUrl)} />
              </CoverImg>
              <Desc>
                <div className="title">{reducerState.detail?.name}</div>
                <Creator>
                  <Avatar
                    src={getNewUrl(reducerState.detail?.creator.avatarUrl)}
                    size={`2rem`}
                  />
                  <SpecialFont color={FontColor.LINKCOLOR}>
                    {reducerState.detail?.creator.nickname}
                  </SpecialFont>
                  <SpecialFont color={FontColor.LIGHTCOLOR} size={`14px`}>
                    {getUpdateTime(reducerState.detail?.createTime) + " ??????"}
                  </SpecialFont>
                </Creator>
                <Tag>
                  <div>?????????</div>
                  {reducerState.detail?.tags.map(tag => (
                    <SpecialFont
                      key={reducerState.detail?.tags.indexOf(tag)}
                      color={FontColor.LIGHTCOLOR}
                    >
                      {tag}
                    </SpecialFont>
                  ))}
                </Tag>
                <Count>
                  <CountItem>
                    <div>?????????</div>
                    <SpecialFont color={FontColor.LIGHTCOLOR} size={`14px`}>
                      {reducerState.detail?.trackCount.toLocaleString()}
                    </SpecialFont>
                  </CountItem>
                  <CountItem>
                    <div>?????????</div>
                    <SpecialFont color={FontColor.LIGHTCOLOR} size={`14px`}>
                      {reducerState.detail?.playCount.toLocaleString()}
                    </SpecialFont>
                  </CountItem>
                  <CountItem>
                    <div>?????????</div>
                    <SpecialFont color={FontColor.LIGHTCOLOR} size={`14px`}>
                      {reducerState.detail?.subscribedCount.toLocaleString()}
                    </SpecialFont>
                  </CountItem>
                  <CountItem>
                    <div>?????????</div>
                    <SpecialFont color={FontColor.LIGHTCOLOR} size={`14px`}>
                      {reducerState.detail?.shareCount.toLocaleString()}
                    </SpecialFont>
                  </CountItem>
                </Count>
                <PlayButton>
                  <Button className="playbutton" onClick={handlePlayAll}>
                    <FaPlay size={`18px`} />
                    ????????????
                  </Button>
                  <Button
                    className="collectbutton"
                    disabled={
                      userLikedPlayLists[0]?.id === reducerState.detail?.id
                    }
                    onClick={() => handleLikeSongList(reducerState.detail?.id)}
                  >
                    <BsFolderPlus size={`18px`} />
                    {userLikedPlayLists.findIndex(
                      obj => obj.id === reducerState.detail?.id
                    ) > -1
                      ? "????????????"
                      : "????????????"}
                  </Button>
                </PlayButton>
                <Intro
                  height={reducerState.isShowIntro ? "100%" : "52px"}
                  onClick={() =>
                    dispatch({
                      type: DetailType.ISHOWINTRO,
                      paylad: !reducerState.isShowIntro
                    })
                  }
                >
                  <Description>
                    <label>?????????</label>
                    <SpecialFont size={`14px`} color={FontColor.LIGHTCOLOR}>
                      {reducerState.detail?.description}
                    </SpecialFont>
                  </Description>
                </Intro>
              </Desc>
            </SongListInfo>

            <SongsList data={tracks} />
            <ButtonBottom>
              {requesting === true ? (
                <Loading scale={0.5} />
              ) : typeof requesting === "string" ? (
                requesting
              ) : (
                <Button className="requestbutton" onClick={requestSongs}>
                  ????????????
                </Button>
              )}
            </ButtonBottom>
          </>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default memo(SongListDetail)

const Container = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  flex: 1;
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: center;
`

const SongListInfo = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
`
const CoverImg = styled.div`
  flex: 0.8;
  display: flex;
  justify-content: center;

  & img {
    margin-top: 8px;
    width: 280px;
    height: 280px;
    border-radius: 10px;
  }
`
const Desc = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    font-size: 32px;
    font-weight: bold;
  }
`
const Creator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`
const Tag = styled.div`
  display: flex;
  gap: 4px;
`
const Count = styled.div`
  display: flex;
  gap: 18px;
`
const CountItem = styled.div`
  display: flex;
  align-items: center;
`

const PlayButton = styled.div`
  display: flex;
  padding: 4px 0;
  gap: 20px;

  .collectbutton,
  .playbutton {
    padding: 10px;
    border-radius: 10px;
    gap: 8px;
    background-color: ${props => props.theme.secondary_color};
    color: white;
    font-size: 16px;
  }
`

interface IntroLightFontProps {
  height: string
}
const Intro = styled.div<IntroLightFontProps>`
  display: flex;
  overflow: hidden;
  height: ${props => props.height};
  cursor: pointer;
`
const Description = styled.div`
  line-height: 24px;

  & label {
    font-size: 16px;
  }
`

const ButtonBottom = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;

  .requestbutton {
    padding: 7px;
    border-radius: 7px;
    background-color: ${props => props.theme.hover_BgColor};
  }
`
