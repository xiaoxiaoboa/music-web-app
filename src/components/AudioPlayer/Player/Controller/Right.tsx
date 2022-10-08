import { FC, ReactElement, memo, useMemo, useState } from "react"
import styled from "styled-components"
import { RiPlayListFill, RiHeart2Line } from "react-icons/ri"
import {
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle,
  TbTrashX
} from "react-icons/tb"
import Volume from "../../../Volume"
import Button from "../../../Button"
import { PlayMode, Track } from "../../../../types"
import { useRecoilState } from "recoil"
import { PlayListState, AudioState } from "../../../../recoil/atom"
import timeFormat from "../../../../utils/timeFormat"

interface IProps {
  audio: HTMLAudioElement
  playMode: PlayMode
  clickIcon: () => void
  playListCount: number
}

const Right: FC<IProps> = (props): ReactElement => {
  const { audio, playMode, clickIcon, playListCount } = props

  const [open, setOpen] = useState<boolean>(false)

  /* 改变图标 */
  const changeIcon = (): JSX.Element => {
    switch (playMode) {
      case PlayMode.LISTLOOP:
        return <TbRepeat className="TbRepeat" />
      case PlayMode.LOOP:
        return <TbRepeatOnce className="TbRepeatOnce" />
      case PlayMode.SHUFFLE:
        return <TbArrowsShuffle className="TbArrowsShuffle" />
      default:
        return <TbArrowsShuffle className="TbArrowsShuffle" />
    }
  }

  /* 音频音量改变时，触发本地存储 */
  audio.onvolumechange = () => {
    const localData = JSON.parse(localStorage.getItem("audiostate") as string)
    const result = { ...localData, ...{ volume: audio.volume } }
    localStorage.setItem("audiostate", JSON.stringify(result))
  }

  /* 初始化音量 */
  const getLocalVolume = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("audiostate") as string)?.volume * 100 ||
      0
    )
  }, [])

  return (
    <RightButton listLength={playListCount}>
      <Button onClick={clickIcon}>{changeIcon()}</Button>
      <Button>
        <RiHeart2Line className="RiHeart2Line" />
      </Button>
      <Button onClick={() => setOpen(prev => !prev)}>
        <RiPlayListFill className="RiPlayListFill" />
      </Button>
      <VolumeButtonBox>
        <Volume media={audio} volume={getLocalVolume} />
      </VolumeButtonBox>
      {open ? <PlayList playListCount={playListCount} /> : <></>}
    </RightButton>
  )
}

interface PlayListProps {
  playListCount: number
}
const PlayList: FC<PlayListProps> = ({ playListCount }): ReactElement => {
  const [audioState, setAudioState] = useRecoilState(AudioState)
  const [playListState, setPlayListState] = useRecoilState(PlayListState)

  /* 双击播放 */
  const handleDbClick = (value: Track): void => {
    const index = playListState.indexOf(value)
    setAudioState(prev => ({ ...prev, ...{ playIndex: index } }))
  }

  /* 清空列表 */
  const handleReSet = () => {
    if (playListState.length < 1) return
    setAudioState(prev => ({
      ...prev,
      ...{ playIndex: null, audio: new Audio() }
    }))
    setPlayListState([])
  }

  return (
    <Container>
      <Wrapper>
        <Head>
          <h2>正在播放</h2>
        </Head>
        <Playing>
          {audioState.playIndex !== null ? (
            <Song>
              <Name title={playListState[audioState.playIndex].name}>
                {playListState[audioState.playIndex].name}
              </Name>
              <Artist title={playListState[audioState.playIndex].ar[0].name}>
                {playListState[audioState.playIndex].ar[0].name}
              </Artist>
              <Alubum title={playListState[audioState.playIndex].al.name}>
                {playListState[audioState.playIndex].al.name}
              </Alubum>
              <Duration>
                {timeFormat(playListState[audioState.playIndex].dt / 1000)}
              </Duration>
            </Song>
          ) : (
            <></>
          )}
        </Playing>
        <Head>
          <div className="info">
            <h2>播放列表</h2>
            <Count>歌曲数量: {playListCount}</Count>
          </div>
          <Button onClick={handleReSet}>
            <TbTrashX className="TbTrashX" />
            清空列表
          </Button>
        </Head>
        <Pending>
          {playListState.map(obj => (
            <Song
              key={obj.id}
              playing={playListState.indexOf(obj) === audioState.playIndex}
              onDoubleClick={() => handleDbClick(obj)}>
              <Name title={obj.name}>{obj.name}</Name>
              <Artist title={obj.ar[0].name}>{obj.ar[0].name}</Artist>
              <Alubum title={obj.al.name}>{obj.al.name}</Alubum>
              <Duration>{timeFormat(obj.dt / 1000)}</Duration>
            </Song>
          ))}
        </Pending>
      </Wrapper>
    </Container>
  )
}

export default memo(Right)

interface ButtonColor {
  listLength: number
}

const RightButton = styled.div<ButtonColor>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 6px;

  .RiHeart2Line,
  .RiPlayListFill,
  .TbArrowsShuffle,
  .TbRepeatOnce,
  .TbRepeat {
    font-size: 1.25rem;
  }

  .RiPlayListFill {
    color: ${props =>
      props.listLength > 0 ? props.theme.secondary_color : "inherit"};
  }
`
const VolumeButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`

const Container = styled.div`
  display: flex;
  position: absolute;
  width: 480px;
  height: 74%;
  bottom: 13%;
  right: 12%;
  background-color: ${props => props.theme.primary_bgColor};
  border: 1px solid ${props => props.theme.secondary_color};
  border-radius: 8px;
  padding: 8px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Head = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 0 0 0 6px;
  justify-content: space-between;

  .info {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }

  .TbTrashX {
    font-size: 18px;
  }
`
const Count = styled.span`
  color: ${props => props.theme.light_color};
  font-size: 14px;
`

interface SongProps {
  playing?: boolean
}

const Song = styled.div<SongProps>`
  display: flex;
  width: inherit;
  height: 40px;
  align-items: center;
  border-radius: 4px;
  border: ${props =>
    props.playing ? `1px solid ${props.theme.secondary_color}` : "unset"};

  &:hover {
    background-color: ${props => props.theme.song_hover_BgColor};
  }
`

const Playing = styled.div`
  margin-top: 10px;
  background-color: ${props => props.theme.secondary_color};
  border-radius: 4px;
`
const Pending = styled.div`
  margin-top: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`

const Name = styled.div`
  flex: 2;
  padding: 0 0 0 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const LightFont = styled.div`
  color: ${props => props.theme.light_color};
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Artist = styled(LightFont)`
  flex: 1;
  text-align: center;
`
const Alubum = styled(LightFont)`
  flex: 2;
  text-align: center;
`
const Duration = styled(LightFont)`
  flex: 1;
  text-align: center;
`
