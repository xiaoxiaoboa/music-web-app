import { FC, ReactElement, useMemo, memo } from "react"
import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri"
import { useRecoilState, useRecoilValue } from "recoil"
import styled from "styled-components"
import useIsLiked from "../../Hooks/useIsLiked"
import { AudioState, PlayListState, UserLikedIds } from "../../recoil/atom"
import { FontColor, RouterPath, Track } from "../../types"
import { request } from "../../utils"
import { addMessage } from "../Snackbar"
import SpecialFont from "../SpecialFont"

interface IProps {
  data: Track[]
}

const SongsList: FC<IProps> = ({ data }): ReactElement => {
  const [state, setState] = useRecoilState(AudioState)
  const [playList, setPlayList] = useRecoilState(PlayListState)
  const [isLiked, isLikedFn, setLikedId] = useIsLiked()

  const handleDbClick = (value: Track): void => {
    /* 找一下是否已经播放过这个歌曲了 */
    const sameIndex = playList.findIndex((obj: Track) => obj.id === value.id)
    /* 如果找到了：把对应歌曲的索引更新到state */
    if (sameIndex > -1) {
      setState(prev => ({ ...prev, ...{ playIndex: sameIndex } }))
    } else {
      const tempList = [...playList]
      tempList.splice(state.playIndex! + 1, 0, value)
      const index = tempList.findIndex(obj => obj.id === value.id)

      setPlayList(tempList)
      setState(prev => ({ ...prev, ...{ playIndex: index } }))
    }
  }

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

  const handleLike = (isLiked: boolean, id: number) => {
    if (isLiked) {
      /* 取消喜欢 */
      request("like", "GET", `&id=${id}&like=${!isLiked}`)
        .then(res => {
          if (res.code === 200) {
            setLikedId(prev => prev.filter(obj => obj !== id))
          }
        })
        .catch(err => {
          addMessage("操作失败,请重试")
          console.log(err)
        })
    } else {
      /* 喜欢 */
      request("like", "GET", `&id=${id}&like=${!isLiked}`)
        .then(res => {
          if (res.code === 200) {
            setLikedId(prev => [...prev, id])
          }
        })
        .catch(err => {
          addMessage("操作失败,请重试")
          console.log(err)
        })
    }
  }

  return (
    <Songs>
      {data.map(song => {
        return (
          <Song key={song.id} onDoubleClick={() => handleDbClick(song)}>
            <SN>
              <SpecialFont color={FontColor.LIGHTCOLOR} size={`20px`}>
                {(data.indexOf(song) + 1).toString()}
              </SpecialFont>
            </SN>
            <div
              className="like"
              onClick={() => handleLike(isLikedFn(song.id), song.id)}
            >
              {isLikedFn(song.id) ? (
                <RiHeart2Fill className="RiHeart2Fill" />
              ) : (
                <RiHeart2Line className="RiHeart2Line" />
              )}
            </div>
            <NameWrapper title={song.name}>
              <Name>{song.name}</Name>
            </NameWrapper>
            <Artist title={song.ar[0].name}>
              <SpecialFont
                link
                size={`18px`}
                color={FontColor.LIGHTCOLOR}
                to={{ path: `${RouterPath.ARTIST}`, id: song.ar[0].id }}
              >
                {song.ar[0].name}
              </SpecialFont>
            </Artist>
            <Album title={song.al.name}>
              <SpecialFont
                color={FontColor.LIGHTCOLOR}
                link
                size={`18px`}
                to={{ path: RouterPath.ALBUM, id: song.al.id }}
                className="album"
              >
                {song.al.name}
              </SpecialFont>
            </Album>
            <Duration>
              <SpecialFont color={FontColor.LIGHTCOLOR} size={`18px`}>
                {getMinute(song.dt)}
              </SpecialFont>
            </Duration>
          </Song>
        )
      })}
    </Songs>
  )
}

export default memo(SongsList)

const Songs = styled.div`
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

  .like {
    flex: 0.2;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .RiHeart2Line,
    .RiHeart2Fill {
      width: 20px;
      height: 20px;
      color: ${props => props.theme.secondary_color};
    }
  }
`

const Hidden = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const SN = styled(Hidden)`
  flex: 0.2;
  display: flex;
  align-items: center;
  justify-content: center;
`
const NameWrapper = styled.div`
  flex: 2.5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0 4px;
  font-size: 20px;
  overflow: hidden;
`
const Name = styled(Hidden)``
const Artist = styled(Hidden)`
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 4px;
`
const Album = styled(Artist)`
  overflow: hidden;

  .album {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
const Duration = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
