import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar"
import { FaPlay } from "react-icons/fa"
import { RiHeart2Fill, RiHeart2Line } from "react-icons/ri"
import { BsFolderCheck, BsFolderPlus } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { songListsDetail } from "../../utils/request"
import { SongListsDetailType } from "../../types"
import { useRecoilState } from "recoil"
import { SongListDetailState } from "../../recoil"
import Loading from "../../components/Loading"

interface LocationProps {
  hash: string
  key: string
  pathname: string
  search: string
  state: { id: number }
}

const SongListDetail = () => {
  const [state, setState] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const location = useLocation() as LocationProps
  const [detail, setDetail] = useRecoilState(SongListDetailState)

  useEffect(() => {
    /* 如果点击的歌单和之前state中的歌单相同，直接显示，不再请求 */
    if (location.state.id === detail?.id) return setLoaded(true)

    songListsDetail("playlist/detail", location.state.id).then(
      (res: SongListsDetailType) =>
        setDetail(() => {
          setLoaded(() => true)
          return res.playlist
        })
    )
  }, [location])

  /* 格式化音乐时间 */
  const getMinute = (value: number): string => {
    return (
      ("" + (Math.floor(value / 60000) % 60)).slice(-2) +
      ":" +
      ("0" + (Math.floor(value / 1000) % 60)).slice(-2)
    )
  }

  /* 格式化创建时间 */
  const getUpdateTime = (value: number): string => {
    const re = /\//gi
    const str = new Date(value).toLocaleDateString()
    const newStr = str.replace(re, "-")
    return newStr
  }

  return (
    <Container>
      {loaded ? (
        <>
          <SongListInfo>
            <CoverImg>
              <img src={detail?.coverImgUrl} />
            </CoverImg>
            <Desc>
              <div className="title">{detail?.name}</div>
              <Creator>
                <Avatar src={detail?.creator.avatarUrl} size={`2rem`} />
                <LinkFont>{detail?.creator.nickname}</LinkFont>
                <LightFont fontsize={`14px`}>
                  {getUpdateTime(detail.createTime)} 创建
                </LightFont>
              </Creator>
              <Tag>
                <div>标签：</div>
                {detail?.tags.map(tag => (
                  <LinkFont key={detail.tags.indexOf(tag)}>{tag}</LinkFont>
                ))}
              </Tag>
              <Count>
                <CountItem>
                  <div>歌曲：</div>
                  <LightFont fontsize={`14px`}>
                    {detail?.trackCount.toLocaleString()}
                  </LightFont>
                </CountItem>
                <CountItem>
                  <div>播放：</div>
                  <LightFont fontsize={`14px`}>
                    {detail?.playCount.toLocaleString()}
                  </LightFont>
                </CountItem>
                <CountItem>
                  <div>收藏：</div>
                  <LightFont fontsize={`14px`}>
                    {detail?.subscribedCount.toLocaleString()}
                  </LightFont>
                </CountItem>
                <CountItem>
                  <div>分享：</div>
                  <LightFont fontsize={`14px`}>
                    {detail?.shareCount.toLocaleString()}
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
                height={state ? "100%" : "52px"}
                onClick={() => setState(!state)}>
                <IntroLightFont as="div" fontsize={`14px`}>
                  <label>简介：</label>
                  {detail?.description}
                </IntroLightFont>
              </Intro>
            </Desc>
          </SongListInfo>
          <Songs>
            {detail?.tracks.map(track => {
              return (
                <Song key={track.id}>
                  <div className="sn">
                    <SongLightFont fontsize={`20px`}>{detail.tracks.indexOf(track) + 1}</SongLightFont>
                  </div>
                  <div className="like">
                    <RiHeart2Line className="RiHeart2Line" />
                  </div>
                  <div className="name" title={track.al.name}>
                    {track.name}
                  </div>
                  <div className="artist" title={track.al.name}>
                    <SongLightFont fontsize={`20px`}>
                      <SongLinkFont>{track.ar[0].name}</SongLinkFont>
                    </SongLightFont>
                  </div>
                  <div className="album" title={track.al.name}>
                    <SongLightFont fontsize={`20px`}>
                      <SongLinkFont>{track.al.name}</SongLinkFont>
                    </SongLightFont>
                  </div>
                  <div className="duration">
                    <SongLightFont fontsize={`20px`}>
                      {getMinute(track.dt)}
                    </SongLightFont>
                  </div>
                </Song>
              )
            })}
          </Songs>
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

  &::after {
    content: "";
    height: 30px;
  }
`

const Song = styled.div`
  width: 100%;
  display: flex;
  font-size: 18px;
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
  }
  .artist {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .album {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
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
