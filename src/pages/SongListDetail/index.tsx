import React, {
  useState,
  useEffect,
  MouseEventHandler,
  useMemo,
  useReducer,
  useRef
} from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import { FaPlay } from "react-icons/fa"
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri"
import { BsFolderCheck, BsFolderPlus } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { request } from "../../utils/request"
import {
  PlayListUrls,
  SongListsDetailType,
  TrackAndUrl,
  Track,
  DetailState,
  DetailAction,
  DetailType,
  SongList,
  SongDetailType
} from "../../types"
import { useRecoilState } from "recoil"
import { SongListDetailState, PlayListState } from "../../recoil"
import Loading from "../../components/Loading"
import { useSetRecoilState } from "recoil"
import useScroll from "./Hooks/useScroll"

interface LocationProps {
  hash: string
  key: string
  pathname: string
  search: string
  state: { id: number }
}

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
      return { ...state, ...{ songs: paylad as Track[] } }

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

const SongListDetail = () => {
  const location = useLocation() as LocationProps
  const setPlayList = useSetRecoilState(PlayListState)
  const [state, dispatch] = useReducer(reducer, initialState)
  const containerRef = useRef<HTMLDivElement>(null)
  const [test, requesting, requestSongs] = useScroll(
    state.songsId,
    containerRef.current?.parentElement as HTMLDivElement
  )

  useEffect(() => {
    /* 如果点击的歌单和之前state中的歌单相同，直接显示，不再请求 */
    if (location.state.id === state.detail?.id) {
      return dispatch({ type: DetailType.LOADED, paylad: true })
    }

    request("playlist/detail", "GET", `&id=${location.state.id}`).then(
      (res: SongListsDetailType) => {
        dispatch({ type: DetailType.DETAIL, paylad: res.playlist })
        dispatch({
          type: DetailType.SONGSID,
          paylad: res.playlist.trackIds.map(obj => obj.id)
        })
        // const ids = res.playlist.trackIds.map(obj => obj.id)

        // request("song/detail", "GET", `&ids=${ids.toString()}`).then(
        //   (res: SongDetailType) =>
        //     dispatch({ type: DetailType.SONGS, paylad: res.songs })
        // )
        return dispatch({ type: DetailType.LOADED, paylad: true })
      }
    )
  }, [location])

  /* 格式化音乐时间 */
  const getMinute = useMemo(
    () =>
      (value: number): string => {
        return (
          ("" + (Math.floor(value / 60000) % 60)).slice(-2) +
          ":" +
          ("0" + (Math.floor(value / 1000) % 60)).slice(-2)
        )
      },
    [state.detail]
  )

  /* 格式化创建时间 */
  const getUpdateTime = useMemo(
    () =>
      (value: number): string => {
        const re = /\//gi
        const str = new Date(value).toLocaleDateString()
        const newStr = str.replace(re, "-")
        return newStr
      },
    [state.detail]
  )

  /* 双击歌曲播放 */
  const handleClick = (value: Track): void => {
    request("song/url/v1", "GET", `&id=${value.id}&level=standard`).then(
      (res: PlayListUrls) => {
        const newObj: TrackAndUrl = { track: value, trackUrl: res.data[0] }
        setPlayList((prev: TrackAndUrl[]) => [...prev, newObj])
      }
    )
  }

  return (
    <Container ref={containerRef}>
      {state.loaded ? (
        <>
          <SongListInfo>
            <CoverImg>
              <img src={state.detail?.coverImgUrl} />
            </CoverImg>
            <Desc>
              <div className="title">{state.detail?.name}</div>
              <Creator>
                <Avatar src={state.detail?.creator.avatarUrl} size={`2rem`} />
                <LinkFont>{state.detail?.creator.nickname}</LinkFont>
                <LightFont fontsize={`14px`}>
                  {getUpdateTime(state.detail.createTime)} 创建
                </LightFont>
              </Creator>
              <Tag>
                <div>标签：</div>
                {state.detail?.tags.map(tag => (
                  <LinkFont key={state.detail.tags.indexOf(tag)}>
                    {tag}
                  </LinkFont>
                ))}
              </Tag>
              <Count>
                <CountItem>
                  <div>歌曲：</div>
                  <LightFont fontsize={`14px`}>
                    {state.detail?.trackCount.toLocaleString()}
                  </LightFont>
                </CountItem>
                <CountItem>
                  <div>播放：</div>
                  <LightFont fontsize={`14px`}>
                    {state.detail?.playCount.toLocaleString()}
                  </LightFont>
                </CountItem>
                <CountItem>
                  <div>收藏：</div>
                  <LightFont fontsize={`14px`}>
                    {state.detail?.subscribedCount.toLocaleString()}
                  </LightFont>
                </CountItem>
                <CountItem>
                  <div>分享：</div>
                  <LightFont fontsize={`14px`}>
                    {state.detail?.shareCount.toLocaleString()}
                  </LightFont>
                </CountItem>
              </Count>
              <PlayButton>
                <Button>
                  <FaPlay size={`18px`} />
                  播放全部
                </Button>
                <Button>
                  <BsFolderPlus size={`18px`} />
                  收藏歌单
                </Button>
              </PlayButton>
              <Intro
                height={state.isShowIntro ? "100%" : "52px"}
                onClick={() =>
                  dispatch({
                    type: DetailType.ISHOWINTRO,
                    paylad: !state.isShowIntro
                  })
                }>
                <IntroLightFont as="div" fontsize={`14px`}>
                  <label>简介：</label>
                  {state.detail?.description}
                </IntroLightFont>
              </Intro>
            </Desc>
          </SongListInfo>

          {test.length > 0 ? (
            <>
              <Songs>
                {(test as Track[]).map(song => {
                  return (
                    <Song key={song.id} onDoubleClick={() => handleClick(song)}>
                      <div className="sn">
                        <SongLightFont fontsize={`20px`}>
                          {(test as Track[]).indexOf(song) + 1}
                        </SongLightFont>
                      </div>
                      <div className="like">
                        <RiHeart2Line className="RiHeart2Line" />
                      </div>
                      <div className="name" title={song.name}>
                        <div className="nameWrapper">{song.name}</div>
                      </div>
                      <div className="artist" title={song.ar[0].name}>
                        <SongLightFont fontsize={`18px`}>
                          <SongLinkFont>{song.ar[0].name}</SongLinkFont>
                        </SongLightFont>
                      </div>
                      <div className="album" title={song.al.name}>
                        <SongLightFont fontsize={`18px`}>
                          <SongLinkFont>{song.al.name}</SongLinkFont>
                        </SongLightFont>
                      </div>
                      <div className="duration">
                        <SongLightFont fontsize={`20px`}>
                          {getMinute(song.dt)}
                        </SongLightFont>
                      </div>
                    </Song>
                  )
                })}
              </Songs>
              <ButtonBottom>
                {requesting === true ? (
                  <Loading scale={0.5} />
                ) : typeof requesting === "string" ? (
                  requesting
                ) : (
                  <RequestButton onClick={requestSongs}>加载更多</RequestButton>
                )}
              </ButtonBottom>
            </>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default SongListDetail

/* 加链接的文字 */
const LinkFont = styled.span`
  cursor: pointer;
  color: ${props => props.theme.secondary_color};

  &:hover {
    text-decoration: underline;
  }
`

/* 浅颜色文字 */
interface LightFontProps {
  fontsize: string
}
const LightFont = styled.div<LightFontProps>`
  font-size: ${props => props.fontsize};
  color: ${props => props.theme.light_color};
`

const Container = styled.div`
  padding: 0 calc(10% - 17px) 1.25rem 10%;
  flex: 1;
  display: flex;
  flex-direction: column;
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
`
const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  gap: 8px;
  font-size: 16px;
  background-color: ${props => props.theme.secondary_color};
  color: white;
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
const IntroLightFont = styled(LightFont)`
  line-height: 24px;

  & label {
    font-size: 16px;
    color: ${props => props.theme.primary_color};
  }
`

const Songs = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 18px;

  /* &::after {
    content: "";
    height: 30px;
  } */
`

const Song = styled.div`
  width: 100%;
  display: flex;
  /* font-size: 18px; */
  padding: 14px 0;
  border-radius: 8px;

  &:hover {
    background-color: ${props => props.theme.song_hover_BgColor};
  }

  .sn {
    flex: 0.2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .like {
    flex: 0.2;
    display: flex;
    align-items: center;
    justify-content: center;

    .RiHeart2Line {
      width: 20px;
      height: 20px;
      color: ${props => props.theme.secondary_color};
    }
  }
  .name {
    flex: 2.5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    overflow: hidden;
    padding: 0 4px;
    font-size: 20px;
  }
  .nameWrapper {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .artist {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 4px;
  }
  .album {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 4px;
  }
  .duration {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const SongLinkFont = styled(LinkFont)`
  color: inherit;

  &:hover {
    color: ${props => props.theme.primary_color};
  }
`

const SongLightFont = styled(LightFont)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ButtonBottom = styled.div`
  display: flex;
  justify-content: center;
  height: 30px;
`
const RequestButton = styled(Button)`
  padding: 7px;
  border-radius: 7px;
`
