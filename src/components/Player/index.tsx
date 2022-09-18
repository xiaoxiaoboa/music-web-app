import { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  ControllerBarContainer,
  ControllerWrapper,
  SongCover,
  SongCoverImg,
  SongDetails,
  SongTitle,
  Artist
} from "./index.style"
import { continuousWayEnum, Track, TrackAndUrl } from "../../types"
import Middle from "./Controller/Middle"
import Right from "./Controller/Right"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  AudioState,
  PlayListState,
  prepareForPlayState
} from "../../recoil/atom"
import imgSize from "../../utils/imgSize"
import { getTrackUrl } from "../../utils/getTrackUrl"

const Player: FC = (): ReactElement => {
  const [state, setState] = useRecoilState(AudioState)
  const [playList, setPlayList] = useRecoilState(PlayListState)
  const [prepareForPlay, setPrepareForPlay] =
    useRecoilState(prepareForPlayState)

  // useEffect(() => {
  //   if (playList.length < 1) return
  //   selectMode()
  // }, [playList])

  useEffect(() => {
    if (playList.length < 1 || state.playIndex === null) return
    changeUrl(state.playIndex!)
  }, [state.playIndex])

  useEffect(() => {
    if (prepareForPlay.length < 1) return
    getTrackUrl([prepareForPlay[0], prepareForPlay[1]], val => {
      setPlayList(val as TrackAndUrl[])
    })
  }, [prepareForPlay])

  /* 开始 */
  const handlePlay = (): void => {
    state.audio
      .play()
      .then(() =>
        setState(prev => ({
          ...prev,
          ...{ isPlaying: !state.audio.paused }
        }))
      )
      .catch(err => {
        handlePause()
        console.log("播放失败", err)
      })
  }

  /* 暂停 */
  const handlePause = (): void => {
    state.audio.pause()
    setState(prev => ({
      ...prev,
      ...{ isPlaying: !state.audio.paused }
    }))
  }

  /* 选择播放模式 */
  const selectMode = () => {
    switch (state.continuousWay) {
      case continuousWayEnum.ORDER:
        return orderPlay()
      case continuousWayEnum.SHUFFLE:
        return  shufflePlay()
      case continuousWayEnum.LOOP:
        return loop()
      case continuousWayEnum.LISTLOOP:
        return listLoop()

      default:
        return
    }
  }

  /* 一首歌播放结束时触发 */
  state.audio.onended = () => {
    selectMode()
  }

  /* 下一首 */
  const next = (): void => {
    selectMode()
  }

  const changeUrl = (value: number) => {
    state.audio.src = playList[value]?.trackUrl.url
    handlePlay()
  }

  /* 顺序播放 */
  const orderPlay = (): void => {
    let index: number = state.playIndex === null ? 0 : state.playIndex! + 1
    if (index >= playList.length) return handlePause()
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
  }
  /* 单曲循环 */
  const loop = ():void => {
    handlePause()
    handlePlay()
  }
  /* 列表循环 */
  const listLoop = (): void => {
    let index: number = state.playIndex === null ? 0 : state.playIndex! + 1
    if (index >= playList.length) return setState(prev => ({ ...prev, ...{ playIndex: 0 } }))
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
  }

  /* 随机播放 */
  const shufflePlay = () => {
    const numbers: number[] = playList
      .filter(obj => obj.track.id !== playList[state.playIndex!].track.id)
      .map(obj => obj.track.id)
    const index = Math.floor(Math.random() * numbers.length)
    setState(prev => ({ ...prev, ...{ playIndex: index } }))
  }

  /* 待播放列表向播放列表推送歌曲 */
  const prepareForPlayToPlayList = (): void => {
    if (prepareForPlay.length > 0 && playList.length < prepareForPlay.length) {
      getTrackUrl(prepareForPlay[playList.length], val => {
        setPlayList(prev => [...prev, val as TrackAndUrl])
      })
    }
  }

  return (
    <ControllerBarContainer>
      <ControllerWrapper>
        <SongCover>
          <SongCoverImg
            src={imgSize(playList[state.playIndex!]?.track.al.picUrl, 60, 60)}
          />
          <SongDetails>
            <SongTitle title={playList[state.playIndex!]?.track.name}>
              {playList[state.playIndex!]?.track.name}
            </SongTitle>
            <Artist>{playList[state.playIndex!]?.track.ar[0].name}</Artist>
          </SongDetails>
        </SongCover>
        <Middle handlePlay={handlePlay} handlePause={handlePause} />
        <Right mediaObject={state.audio!} />
      </ControllerWrapper>
    </ControllerBarContainer>
  )
}
export default Player
