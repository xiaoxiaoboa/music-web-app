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
    if (location.state.id === detail?.id) return setLoaded(true)
    
    songListsDetail("playlist/detail", location.state.id).then(
      (res: SongListsDetailType) =>
        setDetail(() => {
          setLoaded(() => true)
          return res.playlist
        })
    )

  }, [location])

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
                  {detail?.trackUpdateTime} 创建
                </LightFont>
              </Creator>
              <Tag>
                <label>标签：</label>
                {detail?.tags.map(tag => (
                  <LinkFont key={detail.tags.indexOf(tag)}>{tag}</LinkFont>
                ))}
              </Tag>
              <Count>
                <span>
                  <label>歌曲：</label>
                  <LightFont fontsize={`14px`}>{detail?.trackCount}</LightFont>
                </span>
                <span>
                  <label>播放：</label>
                  <LightFont fontsize={`14px`}>{detail?.playCount}</LightFont>
                </span>
                <span>
                  <label>收藏：</label>
                  <LightFont fontsize={`14px`}>
                    {detail?.subscribedCount}
                  </LightFont>
                </span>
                <span>
                  <label>分享：</label>
                  <LightFont fontsize={`14px`}>{detail?.shareCount}</LightFont>
                </span>
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
            <Song>
              <div className="sn">
                <LightFont fontsize={`20px`}>1</LightFont>
              </div>
              <div className="like">
                <RiHeart2Line className="RiHeart2Line" />
              </div>
              <div className="name">如果当时</div>
              <div className="artist">
                <LightFont fontsize={`20px`}>许嵩</LightFont>
              </div>
              <div className="album">
                <LightFont fontsize={`20px`}>自定义</LightFont>
              </div>
              <div className="duration">
                <LightFont fontsize={`20px`}>5:16</LightFont>
              </div>
            </Song>
          </Songs>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default SongListDetail

const LinkFont = styled.span`
  cursor: pointer;
  color: ${props => props.theme.secondary_color};

  &:hover {
    text-decoration: underline;
  }
`
interface LightFontProps {
  fontsize: string
}
const LightFont = styled.span<LightFontProps>`
  font-size: ${props => props.fontsize};
  color: ${props => props.theme.light_color};
`

const Container = styled.div`
  /* padding: 0 calc(10% - 17px) 1.25rem 10%; */
  padding: 0 10% 1.25rem 10%;
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
    flex: 3;
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
  }
  .duration {
    flex: 0.3;
    display: flex;
    align-items: center;
    justify-content: start;
  }
`
