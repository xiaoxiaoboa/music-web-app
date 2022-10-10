import { FC, ReactElement, useMemo,memo } from "react"
import { RiHeart2Line } from "react-icons/ri"
import styled from "styled-components"
import { Track } from "../../types"

interface IProps {
  data: Track[]
  handleDbClick: (value: Track) => void
}

const SongsList: FC<IProps> = ({ data, handleDbClick }): ReactElement => {
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
    [data]
  )

  return (
    <Songs>
      {data.map(song => {
        return (
          <Song key={song.id} onDoubleClick={() => handleDbClick(song)}>
            <div className="sn">
              <SongLightFont fontsize={`20px`}>
                {data.indexOf(song) + 1}
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
  )
}

export default memo(SongsList)

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

const Songs = styled.div`
  /* flex: 2; */
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const Song = styled.div`
  width: 100%;
  display: flex;
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

  .album,
  .artist {
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
